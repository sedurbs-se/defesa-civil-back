import { Entity } from 'src/core/logic/Entity';
import { UnidadeHabitacional } from 'src/modules/disasters/domain/unidadeHabitacional/unidade-habitacional';
import { AreaAfetada } from 'src/modules/disasters/domain/areaAfetada/area-afetada';
import { TipoAcao } from './TipoAcao';

interface AcaoProps {
  id?: string;
  tipoId: string;
  tipo?: TipoAcao;

  contexto: string;

  unidadeHabitacionalId: string;
  unidadeHabitacional?: UnidadeHabitacional;

  areaAfetadaId: string;
  areaAfetada?: AreaAfetada;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Acao extends Entity<AcaoProps> {
  constructor(props: AcaoProps) {
    super(props, props.id);
  }

  get tipoId() {
    return this.props.tipoId;
  }

  get tipo() {
    return this.props.tipo;
  }
  get contexto() {
    return this.props.contexto;
  }

  get areaAfetadaId() {
    return this.props.areaAfetadaId;
  }

  get areaAfetada() {
    return this.props.areaAfetada;
  }
  get unidadeHabitacionalId() {
    return this.props.unidadeHabitacionalId;
  }

  get unidadeHabitacional() {
    return this.props.unidadeHabitacional;
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

export { Acao, AcaoProps };
