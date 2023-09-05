import { Entity } from 'src/core/logic/Entity';

interface TarefaProps {
  id?: string;
  acaoId: string;
  nome: string;
  status: string;
  quantificavel: boolean;
  itemBasicoId: string;
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
