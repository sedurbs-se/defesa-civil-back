import { Entity } from 'src/core/logic/Entity';

interface AfetadoProps {
  id?: string;
  nome: string;
  idade: number;
  sexo: string;
  contato: string;
  cpf: string;

  fl_chefe_familia: boolean;
  unidadeHabitacionalId: string;
  unidadeHabitacional?: [];
}

class Afetado extends Entity<AfetadoProps> {
  public obterGrupoIdade() {
    if (this.props.idade < 12) return 'CRIANÇA';
    if (this.props.idade < 18) return 'ADOLESCENTE';
    if (this.props.idade < 60) return 'ADULTO';
    return 'IDOSO';
  }

  constructor(props: AfetadoProps) {
    super(props, props.id);
  }

  get nome() {
    return this.props.nome;
  }

  set nome(nome: string) {
    this.props.nome = nome;
  }

  get idade() {
    return this.props.idade;
  }

  set idade(idade: number) {
    this.props.idade = idade;
  }

  get sexo() {
    return this.props.sexo;
  }

  set sexo(sexo: string) {
    this.props.sexo = sexo;
  }

  get cpf() {
    return this.props.cpf;
  }

  get contato() {
    return this.props.contato;
  }

  set contato(contato: string) {
    this.props.contato = contato;
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

export { AfetadoProps, Afetado };
