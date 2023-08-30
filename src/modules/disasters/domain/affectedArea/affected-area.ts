import { Entity } from 'src/core/logic/Entity';
import { Disaster } from '../disaster/disaster';
import { HousingUnit } from '../housingUnit/housing-unit';
import { Team } from '../agentTeam/team';

interface AffectedAreaProps {
  id?: string;
  disasterId: string;
  order: number;
  name: string;
  disaster?: Disaster;
  housingUnits?: HousingUnit[];
  teams?: Team[];
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

  get teams() {
    return this.props.teams;
  }
}

export { AffectedArea, AffectedAreaProps };
