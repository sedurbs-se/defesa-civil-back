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

  fl_resistente: boolean;
  fl_danificado: boolean;
  fl_destroido: boolean;
  fl_resiliente: boolean;
  fl_desabrigado: boolean;
  fl_desalojado: boolean;
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

  get fl_resistente() {
    return this.props.fl_resistente;
  }
  get fl_danificado() {
    return this.props.fl_danificado;
  }
  get fl_destroido() {
    return this.props.fl_destroido;
  }
  get fl_resiliente() {
    return this.props.fl_resiliente;
  }
  get fl_desabrigado() {
    return this.props.fl_desabrigado;
  }
  get fl_desalojado() {
    return this.props.fl_desalojado;
  }
}

export { UnidadeHabitacionalProps, UnidadeHabitacional };
