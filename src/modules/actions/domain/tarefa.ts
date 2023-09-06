import { Entity } from 'src/core/logic/Entity';
import { Evento } from './evento/evento';

interface TarefaProps {
  id?: string;
  acaoId: string;
  nome: string;
  status: string;
  quantificavel: boolean;
  itemBasicoId: string;
  eventos?: Evento[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Tarefa extends Entity<TarefaProps> {
  constructor(props: TarefaProps) {
    super(props, props.id);
  }

  get acaoId() {
    return this.props.acaoId;
  }

  get nome() {
    return this.props.nome;
  }

  get status() {
    return this.props.status;
  }

  get quantificavel() {
    return this.props.quantificavel;
  }

  get itemBasicoId() {
    return this.props.itemBasicoId;
  }

  get eventos() {
    return this.props.eventos;
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

export { Tarefa, TarefaProps };
