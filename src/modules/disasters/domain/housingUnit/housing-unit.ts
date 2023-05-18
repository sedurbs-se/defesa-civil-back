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

  fl_sos: boolean;

  qtd_familias: number;
  qtd_pessoas: number;
  qtd_idosos: number;
  qtd_criancas: number;
  qtd_adultos: number;
  qtd_adolescente: number;
  qtd_homens: number;
  qtd_mulheres: number;

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

  get fl_sos() {
    return this.props.fl_sos;
  }



  get qtd_familias() {
    return this.props.qtd_familias;
  }
  get qtd_pessoas() {
    return this.props.qtd_pessoas;
  }
  get qtd_idosos() {
    return this.props.qtd_idosos;
  }
  get qtd_criancas() {
    return this.props.qtd_criancas;
  }
  get qtd_adultos() {
    return this.props.qtd_adultos;
  }
  get qtd_adolescente() {
    return this.props.qtd_adolescente;
  }
  get qtd_homens() {
    return this.props.qtd_homens;
  }
  get qtd_mulheres() {
    return this.props.qtd_mulheres;
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
