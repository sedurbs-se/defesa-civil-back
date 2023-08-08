import { Team } from "../agentTeam/team";
import { User } from "../user/user";

interface AgentProps {
    id?: string;
    function: string;
    contact: string;
    fl_lider_equipe?: boolean;
    user_id: string;
    user?: User;
    teams?: Team[];
}


class Agent {
    private props: AgentProps;

    constructor(props: AgentProps) {
        this.props = props;
    }

    get id() {
        return this.props.id;
    }
    
    get user_id() {
        return this.props.user_id;
    }

    get user() {
        return this.props.user;
    }

    get function() {
        return this.props.function;
    }

    get contact() {
        return this.props.contact;
    }

    get fl_lider_equipe() {
        return this.props.fl_lider_equipe;
    }

    set function(func: string) {
        this.props.function = func;
    }

    set contact(contact: string) {
        this.props.contact = contact;
    }

    set fl_lider_equipe(fl_lider_equipe: boolean) {
        this.props.fl_lider_equipe = fl_lider_equipe;
    }
}
export {
    AgentProps,
    Agent
}

