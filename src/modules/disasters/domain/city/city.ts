import { Entity } from 'src/core/logic/Entity';
import { Disaster } from '../disaster/disaster';

interface CityProps {
  id?: string;
  name: string;

  disasters?: Disaster[];
}

class City extends Entity<CityProps> {
  constructor(props: CityProps) {
    super(props, props.id);
  }

  get name() {
    return this.props.name;
  }

  get disasters() {
    return this.props.disasters;
  }
}

export { City, CityProps };
