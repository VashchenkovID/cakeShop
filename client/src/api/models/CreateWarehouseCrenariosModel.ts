import { CreateWarehouseScenatiosItemModel } from './CreateWarehouseScenariosItemModel';

export interface CreateWarehouseScenariosModel {
  scenariosTitle: string | null;
  type: string | null;
  items: CreateWarehouseScenatiosItemModel[] | null;
}
