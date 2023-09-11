import { Entity } from 'src/core/logic/Entity';
import { Usuario } from 'src/modules/disasters/domain/usuario/usuario';

export enum TipoAlteracao {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

interface AlteracaoProps {
  id?: string;
  id_usuario: string;
  usuario?: Usuario;

  tipo: TipoAlteracao; // CREATE, UPDATE, DELETE
  antigo_id: string; // id do objeto antes da alteração
  novo_id: string; // id do objeto depois da alteração

  createdAt: Date;
}

class Alteracao extends Entity<AlteracaoProps> {
  constructor(props: AlteracaoProps) {
    super(props, props.id);
  }
  get id_usuario() {
    return this.props.id_usuario;
  }
  get usuario() {
    return this.props.usuario;
  }
  get tipo() {
    return this.props.tipo;
  }

  get antigo_id() {
    return this.props.antigo_id;
  }

  get novo_id() {
    return this.props.novo_id;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}

export { Alteracao, AlteracaoProps };
