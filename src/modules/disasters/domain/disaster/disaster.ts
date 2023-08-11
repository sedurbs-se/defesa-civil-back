import { AffectedArea } from '../affectedArea/affected-area';
import { City } from '../city/city';

interface DisasterProps {
  id?: string;
  cityId: string;
  date: Date;
  city?: City;
  affectedAreas?: AffectedArea[];
}

class Disaster {
  constructor(private props: DisasterProps) {}

  get id() {
    return this.props.id;
  }

  get cityId() {
    return this.props.cityId;
  }

  set cityId(cityId: string) {
    this.props.cityId = cityId;
  }

  get date() {
    return this.props.date;
  }

  set date(date: Date) {
    this.props.date = date;
  }

  get city() {
    return this.props.city;
  }

  get affectedAreas() {
    return this.props.affectedAreas;
  }
}

export { Disaster, DisasterProps };
