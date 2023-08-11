import { Entity } from 'src/core/logic/Entity';
import { HousingUnit } from '../housingUnit/housing-unit';
import { PhotoType } from '../../photoEnum';

interface PhotosProps {
  id?: string;
  unidadeHabitacionalId: string;
  unidadeHabitacional?: HousingUnit;
  url: string;
  type: PhotoType;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Photos extends Entity<PhotosProps> {
  constructor(props: PhotosProps) {
    super(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      props.id,
    );
  }

  get unidadeHabitacionalId() {
    return this.props.unidadeHabitacionalId;
  }

  get url() {
    return this.props.url;
  }

  get type() {
    return this.props.type;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
