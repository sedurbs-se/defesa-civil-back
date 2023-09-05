interface FamiliaProps {
  id: string;
  unidadeHabitacionalId: string;
}

class Familia {
  constructor(private props: FamiliaProps) {}

  get id() {
    return this.props.id;
  }

  get unidadeHabitacionalId() {
    return this.props.unidadeHabitacionalId;
  }
}

export { Familia, FamiliaProps };
