// import { Transform } from 'class-transformer';
import { UpdateRuleDto, UpdateRuleItemDto } from '../dto/update-rule.dto';

export class UpdateRuleDao {
  name?: string;
  base?: string;
  depth?: number;

  // @Transform(({ value }) => ({ update: {  } }))
  rules?: Partial<UpdateRuleItemDto>[];

  constructor(dto: UpdateRuleDto) {
    Object.assign(this, dto);
  }
}
