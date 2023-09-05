import { Entity } from 'src/core/logic/Entity';
import { Desastre } from '../desastre/desastre';
import { UnidadeHabitacional } from '../unidadeHabitacional/unidade-habitacional';
import { Equipe } from '../agenteEquipe/equipe';

interface AreaAfetadaProps {
  id?: string;
  desastreId: string;
  ordem: number;
  nome: string;
  desastre?: Desastre;
  unidadesHabitacionais?: UnidadeHabitacional[];
  equipes?: Equipe[];
}

class AreaAfetada extends Entity<AreaAfetadaProps> {
  constructor(props: AreaAfetadaProps) {
    super(props, props.id);
  }

  get desastreId() {
    return this.props.desastreId;
  }

  get nome() {
    return this.props.nome;
  }

  get desastre() {
    return this.props.desastre;
  }

  get ordem() {
    return this.props.ordem;
  }

  get unidadesHabitacionais() {
    return this.props.unidadesHabitacionais;
  }

  get equipes() {
    return this.props.equipes;
  }
}

export { AreaAfetada, AreaAfetadaProps };
