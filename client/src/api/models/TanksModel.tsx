import { MTRListModel } from 'src/api/models/MTRListModel';

export type TanksModel = {
  tankId: number | null;
  tankTitle: string;
  mtrType: MTRListModel | string | null;
  usefulVolume: number | string | null;
};
