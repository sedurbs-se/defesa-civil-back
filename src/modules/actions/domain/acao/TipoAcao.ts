import { Entity } from 'src/core/logic/Entity';

interface TipoAcaoProps {
  id?: string;
  nome: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class TipoAcao extends Entity<TipoAcaoProps> {
  constructor(props: TipoAcaoProps) {
    super(props, props.id);
  }

  get nome() {
    return this.props.nome;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }
}

export { TipoAcao, TipoAcaoProps };
