import { Entity } from 'src/core/logic/Entity';
import { AreaAfetada } from '../areaAfetada/area-afetada';
import { Fotos } from '../fotos/fotos';
import { Afetado } from '../afetado/afetado';

interface UnidadeHabitacionalProps {
  id?: string;
  ordem: number;
  areaAfetadaId: string;
  endereco: string;
  coordenadas: string;
  areaAfetada?: AreaAfetada;
  fotos?: Fotos[];
  afetados?: Afetado[];
  createdAt?: Date;
  updatedAt?: Date;
  status_habitacao: StatusHabitacao;
  status_familia: StatusFamilia;
}

export enum StatusHabitacao {
  RESISTENTE = 'RESISTENTE',
  DANIFICADO = 'DANIFICADO',
  DESTRUIDO = 'DESTRUIDO',
}

export enum StatusFamilia {
  RESILIENTE = 'RESILIENTE',
  DESABRIGADO = 'DESABRIGADO',
  DESALOJADO = 'DESALOJADO',
}

class UnidadeHabitacional extends Entity<UnidadeHabitacionalProps> {
  constructor(props: UnidadeHabitacionalProps) {
    super(props, props.id);
  }

  get ordem() {
    return this.props.ordem;
  }

  get areaAfetadaId() {
    return this.props.areaAfetadaId;
  }

  get endereco() {
    return this.props.endereco;
  }

  get coordenadas() {
    return this.props.coordenadas;
  }

  get areaAfetada() {
    return this.props.areaAfetada;
  }

  get fotos() {
    return this.props.fotos;
  }

  get afetados() {
    return this.props.afetados;
  }

  get status_familia() {
    return this.props.status_familia;
  }

  get status_habitacao() {
    return this.props.status_habitacao;
  }
  get createdAt() {
    return this.props.createdAt;
  }
}

export { UnidadeHabitacionalProps, UnidadeHabitacional };
