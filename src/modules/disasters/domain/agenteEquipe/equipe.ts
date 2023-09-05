import { Entity } from 'src/core/logic/Entity';
import { Agente } from '../agente/agente';
import { AreaAfetada } from '../areaAfetada/area-afetada';

interface EquipeProps {
  id?: string;
  name: string;
  areaAfetadaId: string;
  areaAfetada?:AreaAfetada;
  lider_id?: string;
  lider?: Agente;
  agentes?: Agente[];
}

export class Equipe extends Entity<EquipeProps> {
  constructor(props: EquipeProps) {
    super(props, props.id);
  }

  get name() {
    return this.props.name;
  }

  get areaAfetadaId() {
    return this.props.areaAfetadaId;
  }

  get areaAfetada() {
    return this.props.areaAfetada;
  }

  get agentes() {
    return this.props.agentes;
  }

  get lider_id() {
    return this.props.lider_id;
  }

  get lider() {
    return this.props.lider;
  }

  public static create(props: EquipeProps): Equipe {
    const team = new Equipe(props);

    return team;
  }
}
