import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
  Session,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInfoDto, UpdateUserStatusDto } from './dto/update-user.dto';
import { FindUserListDto, UserLoginDto } from './dto/find-user.dto';

import { tips } from '@app/common';
import { CustomSession } from '../types';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('/user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @Roles(Role.admin)
  create(@Body() params: CreateUserDto) {
    return this.userService.create(params.users);
  }

  @Post('list')
  @Roles(Role.admin)
  findList(@Body() params: FindUserListDto) {
    return this.userService.findList(params);
  }

  @Post('login')
  async login(@Body() params: UserLoginDto, @Session() session: CustomSession) {
    // 页面加载时会发送一个空的登录请求，通过 cookie 登陆方式
    if (params.username === void 0 && params.password === void 0) {
      if (session.user) return session.user;
      else return 'SessionCheckFailed';
    }
    // 如果有参数，通过参数中的账号密码登录
    const user = await this.userService.login(params);
    session.user = user;
    return session.user;
  }

  @Post('logout')
  logout(@Session() session: CustomSession) {
    const user = session.user;
    delete session.user;
    return user;
  }

  @Patch('info/:id')
  @Roles(Role.admin, Role.user)
  updateUserInfo(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() params: UpdateUserInfoDto,
    @Session() session: CustomSession,
  ) {
    if (session.user.role === Role.user && id !== session.user.id) {
      throw new ForbiddenException(tips.httpExeceptions.noPermission);
    }
    return this.userService.update(id, params);
  }

  @Patch('status/:id')
  @Roles(Role.admin)
  updateUserStatus(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() params: UpdateUserStatusDto,
  ) {
    return this.userService.update(id, params);
  }
}
