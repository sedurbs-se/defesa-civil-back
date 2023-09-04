import { Entity } from 'src/core/logic/Entity';
import { UnidadeHabitacional } from '../unidadeHabitacional/unidade-habitacional';
import { PhotoType } from '../../photoEnum';

interface FotosProps {
  id?: string;
  unidadeHabitacionalId: string;
  unidadeHabitacional?: UnidadeHabitacional;
  url: string;
  type: PhotoType;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Fotos extends Entity<FotosProps> {
  constructor(props: FotosProps) {
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
