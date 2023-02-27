interface AffectedAreaProps {
    id: string;
    disasterId: string;
    name: string;
    address: string;
    coordinates: number[];
}


class AffectedArea {
    constructor(private props: AffectedAreaProps) {}

    get id() {
        return this.props.id;
    }

    get disasterId() {
        return this.props.disasterId;
    }

    get name() {
        return this.props.name;
    }

    get address() {
        return this.props.address;
    }

    get coordinates() {
        return this.props.coordinates;
    }

    set name(name: string) {
        this.props.name = name;
    }

    set address(address: string) {
        this.props.address = address;
    }

    set coordinates(coordinates: number[]) {
        this.props.coordinates = coordinates;
    }
}

export {
    AffectedArea,
    AffectedAreaProps
}