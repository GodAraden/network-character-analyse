import { IsJSON, IsString } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  ruleId: string;

  @IsString()
  name: string;

  @IsJSON()
  resolve: string;

  @IsJSON()
  parameter: string;
}
