import { AgenteRole } from '../../../src/modules/disasters/domain/agente/enum_roles';

const user_admin = {
  cpf: '00000000000',
  nome: 'admin',
  cargo: AgenteRole.POSTO_COMANDO,
};

const user_agent = {
  funcao: AgenteRole.POSTO_COMANDO,
  contato: '00000000000',
};

export { user_admin, user_agent };
