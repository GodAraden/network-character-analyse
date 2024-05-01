import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Session,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';

import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { ListQueryDto } from './dto/list-query.dto';

import { CustomSession } from '../types';
import { RolesGuard } from '../common/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from '../common/roles.decorator';

@Controller('query')
@UseGuards(RolesGuard)
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post('start')
  @Roles(Role.admin, Role.user)
  create(
    @Body() createQueryDto: CreateQueryDto,
    @Session() session: CustomSession,
  ) {
    // FIXME: mock
    const { id } = session.user || { id: 1 };
    return this.queryService.create(id, createQueryDto);
  }

  @Post('list')
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.admin, Role.user)
  findList(@Body() params: ListQueryDto) {
    return this.queryService.findList(params);
  }

  @Get(':id')
  @Roles(Role.admin, Role.user)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryService.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.admin, Role.user)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.queryService.remove(id);
  }
}
