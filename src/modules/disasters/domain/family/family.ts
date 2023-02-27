interface FamilyProps {
    id: string;
    housingUnitId: string;
}

class Family {
    constructor(private props: FamilyProps) {}

    get id() {
        return this.props.id;
    }

    get housingUnitId() {
        return this.props.housingUnitId;
    }
}

export {
    Family,
    FamilyProps
}