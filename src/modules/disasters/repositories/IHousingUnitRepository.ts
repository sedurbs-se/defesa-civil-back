import { HousingUnit } from '../domain/housingUnit/housing-unit';

export abstract class HousingUnitRepository {
  abstract save(housingUnit: HousingUnit): Promise<void>;
  abstract find(id: string): Promise<HousingUnit>;
  abstract findByOrdem(ordem: number): Promise<HousingUnit>;
  abstract findAll(area_id:string): Promise<HousingUnit[]>;
}
