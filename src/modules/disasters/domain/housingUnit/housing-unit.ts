import { Entity } from "src/core/logic/Entity";

interface HousingUnitProps {
  id?: string;
  affectedAreaId: string;
  address: string;
  coordinates: number[];
}

class HousingUnit extends Entity<HousingUnitProps> {
  constructor(props: HousingUnitProps) {
    super(props, props.id);
  }

  get affectedAreaId() {
    return this.props.affectedAreaId;
  }

  get address() {
    return this.props.address;
  }

  get coordinates() {
    return this.props.coordinates;
  }

  set address(address: string) {
    this.props.address = address;
  }

  set coordinates(coordinates: number[]) {
    this.props.coordinates = coordinates;
  }
}

export { HousingUnitProps, HousingUnit };
