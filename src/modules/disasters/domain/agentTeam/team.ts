import { Entity } from 'src/core/logic/Entity';
import { Agent } from '../agent/agent';
import { AffectedArea } from '../affectedArea/affected-area';

interface TeamProps {
  id?: string;
  name: string;
  affected_area_id: string;
  lider_id?: string;
  lider?: Agent;
  agents?: Agent[];
  affected_area?: AffectedArea;
}

export class Team extends Entity<TeamProps> {
  constructor(props: TeamProps) {
    super(props, props.id);
  }

  get name() {
    return this.props.name;
  }

  get affected_area_id() {
    return this.props.affected_area_id;
  }

  get agents() {
    return this.props.agents;
  }

  get lider_id() {
    return this.props.lider_id;
  }

  get lider() {
    return this.props.lider;
  }

  get affected_area() {
    return this.props.affected_area;
  }

  set affected_area(area: AffectedArea) {
    this.props.affected_area = area;
  }
  public static create(props: TeamProps): Team {
    const team = new Team(props);

    return team;
  }
}
