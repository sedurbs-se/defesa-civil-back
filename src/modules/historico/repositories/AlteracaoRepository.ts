import { Alteracao } from '../domain/alteracao';
import { BuscarTodosFiltrosDTO } from '../dtos/BuscarTodosFiltrosDTO';

export abstract class AlteracaoRepository {
  abstract find(id: string): Promise<Alteracao>;
  abstract findAll(filters: BuscarTodosFiltrosDTO): Promise<Alteracao[]>;
  abstract save(area: Alteracao): Promise<void>;
}
