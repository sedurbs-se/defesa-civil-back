import { Entity } from 'src/core/logic/Entity';

interface AffectedProps {
  id?: string;
  name: string;
  age: number;
  sex: string;
  contact: string;
  cpf: string;

  fl_chefe_familia: boolean;
  unidadeHabitacionalId: string;
  unidadeHabitacional?: [];
}

class Affected extends Entity<AffectedProps> {

  public getAgeGroup() {
    if (this.props.age < 12) return 'CRIANÇA';
    if (this.props.age < 18) return 'ADOLESCENTE';
    if (this.props.age < 60) return 'ADULTO';
    return 'IDOSO';
  }

  constructor(props: AffectedProps) {
    super(props, props.id);
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get age() {
    return this.props.age;
  }

  set age(age: number) {
    this.props.age = age;
  }

  get sex() {
    return this.props.sex;
  }

  set sex(sex: string) {
    this.props.sex = sex;
  }

  get cpf() {
    return this.props.cpf;
  }

  get contact() {
    return this.props.contact;
  }

  set contact(contact: string) {
    this.props.contact = contact;
  }

  get fl_chefe_familia() {
    return this.props.fl_chefe_familia;
  }

  set fl_chefe_familia(fl_chefe_familia: boolean) {
    this.props.fl_chefe_familia = fl_chefe_familia;
  }

  get unidadeHabitacionalId() {
    return this.props.unidadeHabitacionalId;
  }

  get unidadeHabitacional() {
    return this.props.unidadeHabitacional;
  }
}

export { AffectedProps, Affected };
