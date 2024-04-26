import { Injectable } from '@nestjs/common';
import { DBService } from '@app/db';

import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto, UpdateRuleItemDto } from './dto/update-rule.dto';
import { FindRuleDto } from './dto/find-rule.dto';

import { CreateRuleDao, CreateRuleItemDao } from './dao/create-rule.dao';
import { FindRuleDao } from './dao/find-rule.dao';

import { FindRuleView } from './view/find-rule.view';

import { format } from '../utils';

@Injectable()
export class RuleService {
  // 对比规则项
  private compareRuleItems(
    oldArr: UpdateRuleItemDto[],
    newArr: UpdateRuleItemDto[],
  ) {
    const oldRuleItemsMap = new Map(oldArr.map((item) => [item.id, item]));
    const newRuleItemsMap = new Map(newArr.map((item) => [item.id, item]));
    const deleteMany = oldArr
      .filter((item) => !newRuleItemsMap.has(item.id))
      .map((item) => ({ id: item.id }));
    const createMany = {
      data: newArr
        .filter((item) => !oldRuleItemsMap.has(item.id))
        .map((item) => new CreateRuleItemDao(item)),
    };
    const updateMany = newArr
      .filter((item) => oldRuleItemsMap.has(item.id))
      .map((item) => {
        const { id, ...data } = item;
        return { where: { id }, data };
      });
    return { deleteMany, createMany, updateMany };
  }

  constructor(private readonly dbService: DBService) {}

  create(createRuleDto: CreateRuleDto) {
    return this.dbService.rule.create({
      data: format(CreateRuleDao, createRuleDto),
      select: { id: true },
    });
  }

  async findMany(findRuleDto: FindRuleDto) {
    const { take, skip, OR } = format(FindRuleDao, findRuleDto);
    const total = await this.dbService.rule.count({ where: { OR } });
    const list = await this.dbService.rule.findMany({
      take,
      skip,
      where: { OR },
      include: { _count: true },
    });
    return { list: list.map((plain) => new FindRuleView(plain)), total };
  }

  async update(id: string, updateRuleDto: UpdateRuleDto) {
    const oldRule = await this.dbService.rule.findFirst({
      where: { id },
      include: { rules: true },
    });

    const { rules, ...rest } = updateRuleDto;

    return this.dbService.rule.update({
      where: { id },
      data: {
        ...rest,
        rules: rules ? this.compareRuleItems(oldRule.rules, rules) : void 0,
      },
      select: { id: true },
    });
  }

  async remove(id: string) {
    await this.dbService.ruleItem.deleteMany({ where: { ruleId: id } });
    return this.dbService.rule.delete({ where: { id }, select: { id: true } });
  }

  findItems(id: string) {
    return this.dbService.rule.findUniqueOrThrow({
      where: { id },
      include: { rules: true },
    });
  }
}
