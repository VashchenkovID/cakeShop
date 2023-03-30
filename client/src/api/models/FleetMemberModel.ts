import { TanksModel } from 'src/api/models/TanksModel';

export type FleetMemberModel = {
  vesselId?: number;
  vesselTitle: string;
  vesselType: string | null;
  cabinCapacity: number | null;
  deckUsefulArea: number | null;
  tanks: Array<TanksModel> | null;
  license: string | null;
  speedAverageSummer: number | null;
  speedAverageWinter: number | null;
  fuelConsumptionAverageSpeedSummer: number | null;
  fuelConsumptionAverageSpeedWinter: number | null;
  fuelConsumptionInPortSummer: number | null;
  fuelConsumptionInPortWinter: number | null;
  costMobilize: number | null;
  costDemobilize: number | null;
  costLease: number | null;
  devicesLARN: true | null;
  fuelConsumptionNearPlatformSummer: number | null; //не требуется по макету
  fuelConsumptionNearPlatformWinter: number | null; //не требуется по макету
  carryingCapacity: number | null; //не требуется по макету
  costTotal: number | null; //не требуется по макету
  leaseDuration: number | null; //не требуется по макету
  deckTotalArea: number | null; //не требуется по макету
};
