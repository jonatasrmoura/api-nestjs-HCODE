import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async findById(id: number) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdatePutUserDTO) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        birthAt: data.birthAt ? new Date(data.birthAt) : null,
      },
    });
  }

  async updatePartial(
    id: number,
    { birthAt, email, name, role, password }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) data.birthAt = new Date(birthAt);

    if (email) data.email = email;

    if (name) data.name = name;

    if (role) data.role = role;

    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async exists(id: number) {
    const userExists = await this.prisma.user.count({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}
