import { Entity } from 'src/core/logic/Entity';
import { Desastre } from '../desastre/desastre';

interface CidadeProps {
  id?: string;
  nome: string;
  desastres?: Desastre[];
}

class Cidade extends Entity<CidadeProps> {
  constructor(props: CidadeProps) {
    super(props, props.id);
  }

  get nome() {
    return this.props.nome;
  }

  get desastres() {
    return this.props.desastres;
  }
}

export { Cidade, CidadeProps };
