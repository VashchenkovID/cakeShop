import { ProcessingTimeModel } from 'src/api/models/ProcessingTimeModel';

export type PortsModel = {
  coordinates: Array<number | null>;
  portId?: number;
  portTitle: string;
  processingTime: ProcessingTimeModel;
  vesselServiceCount: number | null;
};
