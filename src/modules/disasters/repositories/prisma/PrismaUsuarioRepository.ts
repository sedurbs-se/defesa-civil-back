import { PrismaService } from 'src/prisma.service';
import { Usuario } from '../../domain/usuario/usuario';
import { UsuarioRepository } from '../UsuarioRepository';
import { Injectable } from '@nestjs/common';
import { UsuarioMapper } from '../../mappers/UsuarioMapper';

@Injectable()
export class PrismaUsuarioRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<Usuario> {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return UsuarioMapper.toDomain(user);
  }
  async getByCPF(id: string): Promise<Usuario> {
    const user = await this.prisma.usuario.findUnique({
      where: {
        cpf: id,
      },
      include: {
        agente: true,
      },
    });

    if (!user) return null;

    return UsuarioMapper.toDomainWithDetails(user);
  }
  async save(user: Usuario): Promise<void> {
    const c = UsuarioMapper.toPersistence(user);
    await this.prisma.usuario.create({
      data: c,
    });
  }
  async update(user: Usuario): Promise<void> {
    const c = UsuarioMapper.toPersistence(user);

    await this.prisma.usuario.update({
      where: {
        id: c.id,
      },
      data: c,
    });
  }
}
