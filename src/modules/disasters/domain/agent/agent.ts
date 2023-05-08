interface AgentProps {
    id: string;
    function: string;
    contact: string;
    fl_lider_equipe: boolean;
}


class Agent {
    private props: AgentProps;

    constructor(props: AgentProps) {
        this.props = props;
    }

    get id() {
        return this.props.id;
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

