import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';

import { CreateQueryDto } from './dto/create-query.dto';
import { ListQueryDao } from './dao/list-query.dao';
import { ListQueryDto } from './dto/list-query.dto';

import { format } from '../utils';

@Injectable()
export class QueryService {
  constructor(private readonly dbService: DBService) {}

  create(operatorId: number, createQueryDto: CreateQueryDto) {
    const { ruleId, name } = createQueryDto;
    return this.dbService.query.create({
      data: {
        name,
        network: [],
        analyse: [],
        rule: { connect: { id: ruleId } },
        operator: { connect: { id: operatorId } },
      },
    });
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
