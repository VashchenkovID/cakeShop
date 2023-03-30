export type MTRModel = {
  name: string;
  mtrId?: number;
  customer: string | null;
  unit: string | null;
  unitId: number | null;
  unitSize: number;
  storageType: string | null;
  storageTypeId: number | null;
};
