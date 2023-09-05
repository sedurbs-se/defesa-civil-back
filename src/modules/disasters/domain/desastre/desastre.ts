import { AreaAfetada } from '../areaAfetada/area-afetada';
import { Cidade } from '../cidade/cidade';

interface DesastreProps {
  id?: string;
  cidadeId: string;
  data: Date;
  cidade?: Cidade;
  areasAfetadas?: AreaAfetada[];
}

class Desastre {
  constructor(private props: DesastreProps) {}

  get id() {
    return this.props.id;
  }

  get cidadeId() {
    return this.props.cidadeId;
  }

  set cidadeId(cidadeId: string) {
    this.props.cidadeId = cidadeId;
  }

  get data() {
    return this.props.data;
  }

  set data(data: Date) {
    this.props.data = data;
  }

  get cidade() {
    return this.props.cidade;
  }

  get areasAfetadas() {
    return this.props.areasAfetadas;
  }
}

export { Desastre, DesastreProps };
