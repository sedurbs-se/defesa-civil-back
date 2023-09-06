import { Entity } from 'src/core/logic/Entity';

interface TipoEventoProps {
  id?: string;
  nome: string;
  final: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class TipoEvento extends Entity<TipoEventoProps> {
  constructor(props: TipoEventoProps) {
    super(props, props.id);
  }

  get nome() {
    return this.props.nome;
  }

  get final() {
    return this.props.final;
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

export { TipoEvento, TipoEventoProps };
