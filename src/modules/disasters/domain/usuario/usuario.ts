import { Entity } from 'src/core/logic/Entity';
import { Agente } from '../agente/agente';

interface UsuarioProps {
  id?: string;
  nome: string;
  cpf: string;
  agente?: Agente;
  cargo?: CARGOS;
}

export enum CARGOS {
  ADMIN = 'Admin',
  AGENT = 'Agente',
}

export class Usuario extends Entity<UsuarioProps> {
  constructor(props: UsuarioProps) {
    super(props, props.id);
  }

  get nome() {
    return this.props.nome;
  }

  get cpf() {
    return this.props.cpf;
  }

  get agente() {
    return this.props.agente;
  }

  get cargo() {
    return this.props.cargo;
  }

  public static create(props: UsuarioProps): Usuario {
    const usuario = new Usuario(props);

    return usuario;
  }
}
