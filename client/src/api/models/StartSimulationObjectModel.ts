import { PlatformsModel } from './PlatformsModel';
import { PortsModel } from './PortsModel';
import { ScenarioInputModel } from './ScenarioInputModel';

export type StartSimulationObjectModel = {
  vessels: Array<any>;
  scenario: ScenarioInputModel.RootObject;
  routes: Array<any>;
  ports: Array<PortsModel>;
  platforms: Array<PlatformsModel>;
};
