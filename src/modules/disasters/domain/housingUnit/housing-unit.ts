import { Entity } from "src/core/logic/Entity";
import { AffectedArea } from "../affectedArea/affected-area";
import { Photos } from "../photos/photos";

interface HousingUnitProps {
  id?: string;
  order?: number;
  affectedAreaId: string;
  address: string;
  coordinates: number[];
  affectedAreas?: AffectedArea[];
  photos?: Photos[];
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

  get affectedAreas() {
    return this.props.affectedAreas;
  }

  get photos() {
    return this.props.photos;
  }
  
  set address(address: string) {
    this.props.address = address;
  }

  set coordinates(coordinates: number[]) {
    this.props.coordinates = coordinates;
  }
}

export { HousingUnitProps, HousingUnit };
