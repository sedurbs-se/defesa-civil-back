import { PrismaService } from 'src/prisma.service';
import { User } from '../../domain/user/user';
import { IUserRepository } from '../IUserRepository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../../mappers/UserMapper';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<User> {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return UserMapper.toDomain(user);
  }
  async getByCPF(id: string): Promise<User> {
    const user = await this.prisma.usuario.findUnique({
      where: {
        cpf: id,
      },
      include: {
        agente: true,
      },
    });

    if (!user) return null;

    return UserMapper.toDomainWithDetails(user);
  }
  async save(user: User): Promise<void> {
    const c = UserMapper.toPersistence(user);
    await this.prisma.usuario.create({
      data: c,
    });
  }
  async update(user: User): Promise<void> {
    const c = UserMapper.toPersistence(user);

    await this.prisma.usuario.update({
      where: {
        id: c.id,
      },
      data: c,
    });
  }
}
