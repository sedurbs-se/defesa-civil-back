interface HousingUnitProps {
    id: string;
    affectedAreaId: string;
}

class HousingUnit {
    constructor(private props: HousingUnitProps) {}

    get id() {
        return this.props.id;
    }

    get affectedAreaId() {
        return this.props.affectedAreaId;
    }
}

export {
    HousingUnitProps,
    HousingUnit
}