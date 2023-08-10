import { Entity } from 'src/core/logic/Entity';
import { HousingUnit } from '../housingUnit/housing-unit';

interface ActionProps {
  id?: string;
  type: string;

  afected_cpf: string;
  afected_contact: string;
  afected_name: string;

  housingUnitId: string;
  housingUnit?: HousingUnit;

  createdAt?: Date;
  updatedAt?: Date;
}

class Action extends Entity<ActionProps> {
  constructor(props: ActionProps) {
    super(props, props.id);
  }

  get type() {
    return this.props.type;
  }

  get afected_cpf() {
    return this.props.afected_cpf;
  }

  get afected_contact() {
    return this.props.afected_contact;
  }

  get afected_name() {
    return this.props.afected_name;
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
}

export { Action, ActionProps };
