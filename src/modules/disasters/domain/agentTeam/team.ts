import { Entity } from "src/core/logic/Entity";
import { Agent } from "../agent/agent";

interface TeamProps  {
    id?: string;
    name: string;
    function: string;
    contact: string;
    affected_area_id: string;
    lider_id?: string;
    lider?: Agent;
    agents?: Agent[];
}

export class Team  extends Entity<TeamProps> {
    constructor(props: TeamProps) {
        super(props, props.id);
    }

    get name() {
        return this.props.name;
    }

    get function() {
        return this.props.function;
    }

    get contact() {
        return this.props.contact;
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

    public static create(props: TeamProps): Team {
        const team = new Team(props);

        return team;
    }
    

} 

