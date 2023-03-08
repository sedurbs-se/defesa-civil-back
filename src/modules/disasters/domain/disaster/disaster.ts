interface DisasterProps {
    id: string;
    address: string;
    coordinates: number[];
    city: string;
    event: string;
    date: Date;
    agentId: string;
}



class Disaster {
    constructor(private props: DisasterProps) {}

    get id() {
        return this.props.id;
    }

    get address() {
        return this.props.address;
    }

    get coordinates() {
        return this.props.coordinates;
    }

    get city() {
        return this.props.city;
    }

    get event() {
        return this.props.event;
    }

    get date() {
        return this.props.date;
    }

    get agentId() {
        return this.props.agentId;
    }

    set coordinates(coordinates: number[]) {
        this.props.coordinates = coordinates;
    }

    set address(address: string) {
        this.props.address = address;
    }

    set city(city: string) {
        this.props.city = city;
    }

    set event(event: string) {
        this.props.event = event;
    }

    set date(date: Date) {
        this.props.date = date;
    }

    set agentId(agentId: string) {
        this.props.agentId = agentId;
    }
}

export {
    Disaster,
    DisasterProps
}