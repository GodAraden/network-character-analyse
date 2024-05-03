// import { Transform } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UpdateRuleDto, UpdateRuleItemDto } from '../dto/update-rule.dto';

export class UpdateRuleDao {
  name?: string;
  base?: string;
  depth?: number;

  resolve: Prisma.JsonValue;
  parameter: Prisma.JsonValue;

  // @Transform(({ value }) => ({ update: {  } }))
  rules?: Partial<UpdateRuleItemDto>[];

  constructor(dto: UpdateRuleDto) {
    Object.assign(this, dto);
  }
}
