import { IsDefined, IsString } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  ruleId: string;

  @IsString()
  name: string;

  @IsDefined()
  resolve: string;

  @IsDefined()
  parameter: string;
}
