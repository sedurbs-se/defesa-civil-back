interface AgentProps {
    id: string;
    name: string;
    function: string;
    contact: string;
}


class Agent {
    private props: AgentProps;

    constructor(props: AgentProps) {
        this.props = props;
    }

    get id() {
        return this.props.id;
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

    set name(name: string) {
        this.props.name = name;
    }

    set function(func: string) {
        this.props.function = func;
    }

    set contact(contact: string) {
        this.props.contact = contact;
    }
}

export {
    AgentProps,
    Agent
}

