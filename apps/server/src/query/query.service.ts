import { Injectable } from '@nestjs/common';
import { JsonValue } from '@prisma/client/runtime/library';
import { DBService } from '@app/db';
import axios from 'axios';

import { CreateQueryDto } from './dto/create-query.dto';
import { ListQueryDao } from './dao/list-query.dao';
import { ListQueryDto } from './dto/list-query.dto';

import { format } from '../utils';
import { RuleService } from '../rule/rule.service';

type Rule = { parameter: JsonValue; resolve: JsonValue; rules?: Rule[] };
type Parameter = {
  header?: object;
  query?: object;
  body?: object;
  path?: object;
};
type Resolve = {
  title: string;
  type: string;
  label?: string;
  take?: string[];
  formatter?: object;
};

@Injectable()
export class QueryService {
  constructor(
    private readonly dbService: DBService,
    private readonly ruleService: RuleService,
  ) {}

  private resolveRule<T extends Rule>(rule: T) {
    const { parameter, resolve, rules, ...rest } = rule;

    let newParameter = parameter;
    let newResolve = resolve;
    let newRules;

    if (typeof parameter === 'string') {
      newParameter = JSON.parse(parameter);
    }

    if (typeof resolve === 'string') {
      newResolve = JSON.parse(resolve);
    }

    if (Array.isArray(rules)) {
      newRules = rules.map((item) => this.resolveRule(item));
    }

    return {
      ...rest,
      rules: newRules,
      parameter: newParameter,
      resolve: newResolve,
    };
  }

  private checkParameter(parameter: Parameter, dto: Parameter) {
    const types: (keyof Parameter)[] = ['header', 'query', 'path', 'body'];
    types.forEach((type) => {
      if (dto[type]) {
        if (!parameter[type]) throw new Error('E10001');
        Object.entries(dto[type]).forEach(([key, validatorRule]) => {
          if (validatorRule && !parameter[type][key]) {
            throw new Error('E10002');
          }
        });
      }
    });
  }

  private mergeParameter(pA: Parameter, pB: Parameter) {
    const types: (keyof Parameter)[] = ['header', 'query', 'path', 'body'];
    const res: Parameter = {};
    types.forEach((type) => {
      if (pA[type] || pB[type]) {
        res[type] = Object.assign({}, pA[type], pB[type]);
      }
    });
    return res;
  }

  private async getResponse(url: string, params?: Parameter) {
    const { header, query, path } = params || {};
    let newUrl = url;

    if (path) {
      Object.entries(path).forEach(([key, value]) => {
        newUrl = newUrl.replace(`{${key}}`, value);
      });
    }

    if (query) {
      newUrl += `?${Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`;
    }

    const res = await axios.get(newUrl, { headers: header });
    return res;
  }

  private resolveResponse(response: any | Array<any>, resolver: Resolve) {
    const { title, type, take, formatter, label } = resolver;
    const res = {};
    switch (type) {
      case 'description':
        const takeSet = new Set(
          take || Object.keys(response).filter((key) => !key.startsWith('_')),
        );
        Object.entries(response).forEach(([key, value]) => {
          if (takeSet.has(key)) {
            key = formatter?.['_key']?.[key] || key;
            if (formatter[key] && formatter[key][value]) {
              res[key] = formatter[key][value];
            } else if (formatter[key] && formatter[key]['_other']) {
              res[key] = formatter[key]['_other'];
            } else {
              res[key] = value;
            }
          }
        });
        break;
      case 'line':
        if (Array.isArray(response)) {
          take?.forEach((key) => {
            res[formatter?.['_key']?.[key] || key] = response.map(
              (item, index) => [item[label] || index, item[key]],
            );
          });
        }
        break;
      case 'pie':
        if (Array.isArray(response)) {
          take?.forEach((key) => {
            const map = new Map();
            response.forEach((item) => {
              if (item[key]) {
                map.set(
                  item[key],
                  (map.get(item[key]) || 0) + (Number(item[key]) || 1),
                );
              }
            });
            res[formatter?.['_key']?.[key] || key] = Array.from(map);
          });
        }
        break;
      case 'count':
        if (Array.isArray(response)) {
          take?.forEach((key) => {
            res[formatter?.['_key']?.[key] || key] = {
              icon: formatter?.['_icon']?.[key] || key,
              count: response.reduce(
                (count, item) => (Number(item[key]) || 0) + count,
                0,
              ),
            };
          });
        }
        break;
      case 'graph':
        if (Array.isArray(response)) {
          res[type] = response.map((item) =>
            Object.fromEntries(
              Object.entries(item).filter(([key]) =>
                (take || []).includes(key),
              ),
            ),
          );
        }
        break;
    }

    return { title, type, res };
  }

  private waitRandomTime(min: number = 100, max: number = 3000): Promise<void> {
    if (max <= min) [min, max] = [max, min];
    const randomWaitTime = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise((resolve) => {
      setTimeout(resolve, randomWaitTime);
    });
  }

  // private fetchData(createQueryDto: CreateQueryDto) {}
  private async analyseNode(parameter, rule) {
    const parsedParams: Parameter = JSON.parse(parameter);
    this.checkParameter(parsedParams, rule.parameter as object);
    const analyse = [];
    for (const item of rule.rules) {
      const { data } = await this.getResponse(
        rule.base + item.path,
        this.mergeParameter(parsedParams, item.parameter),
      );
      analyse.push(this.resolveResponse(data, item.resolve));
      await this.waitRandomTime();
    }
    return analyse;
  }

  async create(operatorId: number, createQueryDto: CreateQueryDto) {
    const { ruleId, name, parameter } = createQueryDto;
    const rule = this.resolveRule(
      await this.ruleService.findItems(createQueryDto.ruleId),
    );

    const query = await this.dbService.query.create({
      data: {
        name,
        network: [],
        analyse: [],
        rule: { connect: { id: ruleId } },
        operator: { connect: { id: operatorId } },
      },
    });

    this.analyseNode(parameter, rule)
      .then(async (analyse) => {
        await this.dbService.query.update({
          where: { id: query.id },
          data: { analyse, status: 'success' },
        });
      })
      .catch(async (error) => {
        await this.dbService.query.update({
          where: { id: query.id },
          data: { analyse: error?.message || 'Error', status: 'failed' },
        });
      });

    return query;
  }

  async findList(params: ListQueryDto) {
    const { skip, take, ...where } = format(ListQueryDao, params);
    console.log(params, where);

    const count = await this.dbService.query.count({ where });
    const list = await this.dbService.query.findMany({
      where,
      skip,
      take,
      orderBy: { createAt: 'desc' },
      select: {
        id: true,
        name: true,
        ruleId: true,
        operatorId: true,
        createAt: true,
        status: true,
      },
    });
    return { list, count };
  }

  findOne(id: string) {
    return this.dbService.query.findUniqueOrThrow({ where: { id } });
  }

  remove(id: string) {
    return this.dbService.query.delete({
      where: { id },
      select: { id: true },
    });
  }
}
