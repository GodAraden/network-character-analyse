import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  ParseUUIDPipe,
  // UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { FindRuleDto } from './dto/find-rule.dto';
import { Roles } from '../common/roles.decorator';
// import { RolesGuard } from '../common/roles.guard';

@Controller('rule')
// @UseGuards(RolesGuard)
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Post('create')
  @Roles(Role.admin)
  create(@Body() createRuleDto: CreateRuleDto) {
    return this.ruleService.create(createRuleDto);
  }

  @Post('list')
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.admin, Role.user)
  findAll(@Body() findRuleDto: FindRuleDto) {
    return this.ruleService.findMany(findRuleDto);
  }

  @Get(':id')
  @Roles(Role.admin, Role.user)
  @UseInterceptors(ClassSerializerInterceptor)
  findItems(@Param('id', ParseUUIDPipe) id: string) {
    return this.ruleService.findItems(id);
  }

  @Patch(':id')
  @Roles(Role.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRuleDto: UpdateRuleDto,
  ) {
    return this.ruleService.update(id, updateRuleDto);
  }

  @Delete(':id')
  @Roles(Role.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ruleService.remove(id);
  }
}
