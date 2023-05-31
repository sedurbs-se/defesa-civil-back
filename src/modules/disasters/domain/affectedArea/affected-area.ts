import { Entity } from 'src/core/logic/Entity';
import { Disaster } from '../disaster/disaster';
import { HousingUnit } from '../housingUnit/housing-unit';

interface AffectedAreaProps {
  id?: string;
  disasterId: string;
  order: number;
  name: string;

  disaster?: Disaster;
  housingUnits?: HousingUnit[];
}

class AffectedArea extends Entity<AffectedAreaProps> {
  constructor(props: AffectedAreaProps) {
    super(props, props.id);
  }

  get disasterId() {
    return this.props.disasterId;
  }

  get name() {
    return this.props.name;
  }

  get disaster() {
    return this.props.disaster;
  }

  get order() {
    return this.props.order;
  }

  get housingUnits() {
    return this.props.housingUnits;
  }

}

export { AffectedArea, AffectedAreaProps };
