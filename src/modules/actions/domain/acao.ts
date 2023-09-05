import { Entity } from 'src/core/logic/Entity';
import { UnidadeHabitacional } from 'src/modules/disasters/domain/unidadeHabitacional/unidade-habitacional';
import { AreaAfetada } from 'src/modules/disasters/domain/areaAfetada/area-afetada';

interface AcaoProps {
  id?: string;
  tipoId: string;

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

  get contexto() {
    return this.props.contexto;
  }

  get areaAfetadaId() {
    return this.props.areaAfetadaId;
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
