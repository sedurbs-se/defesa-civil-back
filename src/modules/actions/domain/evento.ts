import { Entity } from 'src/core/logic/Entity';

interface EventoProps {
  id?: string;
  tarefaId: string;
  descricao: string;
  tipoEventoId: string;
  fotoId: string;
  quantidade?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Evento extends Entity<EventoProps> {
  constructor(props: EventoProps) {
    super(props, props.id);
  }

  get tarefaId() {
    return this.props.tarefaId;
  }

  get descricao() {
    return this.props.descricao;
  }

  get tipoEventoId() {
    return this.props.tipoEventoId;
  }

  get fotoId() {
    return this.props.fotoId;
  }

  get quantidade() {
    return this.props.quantidade;
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

export { Evento, EventoProps };
