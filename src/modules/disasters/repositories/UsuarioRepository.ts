import { Usuario } from '../domain/usuario/usuario';

export abstract class UsuarioRepository {
  abstract getById(id: string): Promise<Usuario>;
  abstract getByCPF(id: string): Promise<Usuario>;
  abstract save(user: Usuario): Promise<void>;
  abstract update(user: Usuario): Promise<void>;
}
