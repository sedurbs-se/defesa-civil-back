import { Entity } from 'src/core/logic/Entity';
import { UnidadeHabitacional } from 'src/modules/desastres/domain/unidadeHabitacional/unidade-habitacional';
import { AreaAfetada } from 'src/modules/desastres/domain/areaAfetada/area-afetada';

interface AcaoProps {
  id?: string;
  typeId: string;

  context: string;

  housingUnitId: string;
  housingUnit?: UnidadeHabitacional;

  affectedAreaId: string;
  affectedArea?: AreaAfetada;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Acao extends Entity<AcaoProps> {
  constructor(props: AcaoProps) {
    super(props, props.id);
  }

  get typeId() {
    return this.props.typeId;
  }

  get context() {
    return this.props.context;
  }

  get affectedAreaId() {
    return this.props.affectedAreaId;
  }

  get housingUnitId() {
    return this.props.housingUnitId;
  }

  get housingUnit() {
    return this.props.housingUnit;
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
