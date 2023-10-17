import { Entity } from 'src/core/logic/Entity';
import { Usuario } from 'src/modules/disasters/domain/usuario/usuario';

export enum TipoAlteracao {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum AlteracaoTable {
  DESASTRE = 'DESASTRE',
  AREA_AFETADA = 'AREA_AFETADA',
  UNIDADE_HABITACIONAL = 'UNIDADE_HABITACIONAL',
  EQUIPE = 'EQUIPE',
  AFETADO = 'AFETADO',
}

export const buildQuery = (tabela: AlteracaoTable, id: string) => {


  if (tabela === AlteracaoTable.DESASTRE) {
    return `
    SELECT data, nome as municipio_name FROM Desastre 
      join Municipio on Desastre.municipio_id = Municipio.id
    WHERE Desastre.id = '${id}'
    `;
  }

  if (tabela === AlteracaoTable.AREA_AFETADA) {
    return `
      SELECT nome FROM AreaAfetada WHERE id = '${id}'
    `;
  }

  if (tabela === AlteracaoTable.UNIDADE_HABITACIONAL) {
    return `
      SELECT coordenadas, endereco, GROUP_CONCAT(FotoUnidade.id, ",") as fotos FROM UnidadeHabitacional
      left join FotoUnidade on FotoUnidade.unidadeHabitacionalId = UnidadeHabitacional.id
      WHERE UnidadeHabitacional.id = '${id}'
      `;
  }

  if (tabela === AlteracaoTable.EQUIPE) {
    return `
      SELECT * FROM Equipe WHERE id = '${id}'
    `;
  }

  if (tabela === AlteracaoTable.AFETADO) {
    return `
      SELECT * FROM Afetado WHERE id = '${id}'
    `;
  }
};

export const buildQueryIds = (tabela: AlteracaoTable, id: string) => {
  if (tabela === AlteracaoTable.DESASTRE) {
    return `
      SELECT 
      Desastre.id as id_desastre,
      AreaAfetada.id as id_area, 
      UnidadeHabitacional.id as id_unidade, 
      Equipe.id as id_equipe,
      Afetado.id as id_afetado 
        FROM Desastre
        left join AreaAfetada on AreaAfetada.desastreId = Desastre.id
        left join UnidadeHabitacional on UnidadeHabitacional.areaAfetadaId = AreaAfetada.id
        left join Equipe on Equipe.areaAfetadaId = AreaAfetada.id
        left join Afetado on Afetado.unidadeHabitacionalId = Afetado.id
        group by Desastre.id, AreaAfetada.id, UnidadeHabitacional.id, Afetado.id
        having Desastre.id = '${id}'
        `;
  }

  if (tabela === AlteracaoTable.AREA_AFETADA) {
    return `
      SELECT 
      AreaAfetada.id as id_area,
      UnidadeHabitacional.id as id_unidade,
      Equipe.id as id_equipe,
      Afetado.id as id_afetado
        FROM AreaAfetada
        left join UnidadeHabitacional on UnidadeHabitacional.areaAfetadaId = AreaAfetada.id
        left join Equipe on Equipe.areaAfetadaId = AreaAfetada.id
        left join Afetado on Afetado.unidadeHabitacionalId = Afetado.id
        group by AreaAfetada.id, UnidadeHabitacional.id, Afetado.id
        having AreaAfetada.id = '${id}'
    `;
  }

  if (tabela === AlteracaoTable.UNIDADE_HABITACIONAL) {
    return `
      SELECT
      UnidadeHabitacional.id as id_unidade,
      Afetado.id as id_afetado
        FROM UnidadeHabitacional
        left join Afetado on Afetado.unidadeHabitacionalId = Afetado.id
        group by UnidadeHabitacional.id, Afetado.id
        having UnidadeHabitacional.id = '${id}'
    `;
  }
};

interface AlteracaoProps {
  id?: string;
  id_usuario: string;
  usuario?: Usuario;

  tipo: TipoAlteracao; // CREATE, UPDATE, DELETE
  tabela: string; // nome da tabela que sofreu a alteração
  antigo_id: string; // id do objeto antes da alteração
  novo_id: string; // id do objeto depois da alteração
  item_id: string; // id do objeto depois da alteração

  antigo?: Object;
  novo?: Object;

  createdAt: Date;
}

class Alteracao extends Entity<AlteracaoProps> {
  constructor(props: AlteracaoProps) {
    super(props, props.id);
  }
  get id_usuario() {
    return this.props.id_usuario;
  }
  get usuario() {
    return this.props.usuario;
  }
  get tipo() {
    return this.props.tipo;
  }
  get tabela() {
    return this.props.tabela;
  }

  get antigo_id() {
    return this.props.antigo_id;
  }

  get novo_id() {
    return this.props.novo_id;
  }

  get item_id() {
    return this.props.item_id;
  }

  get antigo() {
    return this.props.antigo;
  }

  get novo() {
    return this.props.novo;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}

export { Alteracao, AlteracaoProps };
