import { Entity } from 'src/core/logic/Entity';
import { HousingUnit } from 'src/modules/disasters/domain/housingUnit/housing-unit';
import { AffectedArea } from 'src/modules/disasters/domain/affectedArea/affected-area';

interface ActionProps {
  id?: string;
  typeId: string;

  context: string;

  housingUnitId: string;
  housingUnit?: HousingUnit;

  affectedAreaId: string;
  affectedArea?: AffectedArea;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Action extends Entity<ActionProps> {
  constructor(props: ActionProps) {
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

export { Action, ActionProps };
