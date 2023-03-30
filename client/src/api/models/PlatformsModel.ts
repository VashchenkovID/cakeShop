import { ProcessingTimeModel } from 'src/api/models/ProcessingTimeModel';
import { TanksModel } from 'src/api/models/TanksModel';

export type PlatformsModel = {
  coordinates: Array<number | null>;
  platformId?: number;
  platformTitle: string;
  processingTime: ProcessingTimeModel;
  staffMaximumCount: number | null;
  deckArea: number | null;
  tanks: Array<TanksModel>;
};
