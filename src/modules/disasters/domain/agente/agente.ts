import { Equipe } from '../agenteEquipe/equipe';
import { Usuario } from '../usuario/usuario';

interface AgenteProps {
  id?: string;
  funcao: string;
  contato: string;
  fl_lider_equipe?: boolean;
  usuarioId: string;
  usuario?: Usuario;
  equipes?: Equipe[];
}

class Agente {
  private props: AgenteProps;

  constructor(props: AgenteProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get usuarioId() {
    return this.props.usuarioId;
  }

  get user() {
    return this.props.usuario;
  }

  get funcao() {
    return this.props.funcao;
  }

  set funcao(func: string) {
    this.props.funcao = func;
  }

  get contato() {
    return this.props.contato;
  }

  set contato(contato: string) {
    this.props.contato = contato;
  }

  get fl_lider_equipe() {
    return this.props.fl_lider_equipe;
  }

  set fl_lider_equipe(fl_lider_equipe: boolean) {
    this.props.fl_lider_equipe = fl_lider_equipe;
  }
}
export { AgenteProps, Agente };
