import { Entity } from 'src/core/logic/Entity';
import { TipoEvento } from './tipoEvento';

interface EventoProps {
  id?: string;
  tarefaId: string;
  descricao: string;
  tipoEventoId: string;
  fotoId: string;
  quantidade?: number;
  tipoEvento?: TipoEvento;
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

  get tipoEvento() {
    return this.props.tipoEvento;
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
