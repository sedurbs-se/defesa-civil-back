import { Entity } from 'src/core/logic/Entity';
import { Agente } from '../agente/agente';

interface TeamProps {
  id?: string;
  name: string;
  affected_area_id: string;
  lider_id?: string;
  lider?: Agente;
  agents?: Agente[];
}

export class Equipe extends Entity<TeamProps> {
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

  public static create(props: TeamProps): Equipe {
    const team = new Equipe(props);

    return team;
  }
}
