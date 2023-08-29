import { Entity } from 'src/core/logic/Entity';
import { AffectedArea } from '../affectedArea/affected-area';
import { Photos } from '../photos/photos';

interface HousingUnitProps {
  id?: string;
  order: number;
  affectedAreaId: string;
  address: string;
  coordinates: string;
  affectedArea?: AffectedArea;
  photos?: Photos[];
  createdAt?: Date;
  updatedAt?: Date;

  fl_resistente: boolean;
  fl_danificado: boolean;
  fl_destroido: boolean;
  fl_resiliente: boolean;
  fl_desabrigado: boolean;
  fl_desalojado: boolean;
}

class HousingUnit extends Entity<HousingUnitProps> {
  constructor(props: HousingUnitProps) {
    super(props, props.id);
  }

  get order() {
    return this.props.order;
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

  get affectedArea() {
    return this.props.affectedArea;
  }

  get photos() {
    return this.props.photos;
  }

  get fl_resistente() {
    return this.props.fl_resistente;
  }
  get fl_danificado() {
    return this.props.fl_danificado;
  }
  get fl_destroido() {
    return this.props.fl_destroido;
  }
  get fl_resiliente() {
    return this.props.fl_resiliente;
  }
  get fl_desabrigado() {
    return this.props.fl_desabrigado;
  }
  get fl_desalojado() {
    return this.props.fl_desalojado;
  }
}

export { HousingUnitProps, HousingUnit };
