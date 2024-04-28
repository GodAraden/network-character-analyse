import { IsJSON, IsString } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  ruleId: string;

  @IsString()
  name: string;

  @IsJSON()
  header: string;

  @IsJSON()
  parameter: string;
}
