import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Session,
} from '@nestjs/common';

import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { CustomSession } from '../types';
import { ListQueryDto } from './dto/list-query.dto';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post('start')
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
  findList(@Body() params: ListQueryDto) {
    return this.queryService.findList(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueryDto: UpdateQueryDto) {
    return this.queryService.update(+id, updateQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queryService.remove(+id);
  }
}
