import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return { body };
  }

  @Get()
  async list() {
    return { users: [] };
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(
    @Body() { name, email, password }: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'PUT',
      name,
      email,
      password,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { name, email, password }: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'PATCH',
      name,
      email,
      password,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
