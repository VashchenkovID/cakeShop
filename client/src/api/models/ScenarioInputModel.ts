export declare module ScenarioInputModel {
  export interface InputData {
    validStatus: boolean;
    projectType?: any;
    details?: any;
    imitationDateStart?: any;
    imitationDateEnd?: any;
  }

  export interface PlatformsList {
    validStatus: boolean;
    platformAndOptions: any[];
    platformInSidebar?: any;
  }

  export interface PortsList {
    validStatus: boolean;
    portsIds: any[];
    portInSidebar?: any;
  }

  export interface RoutesList {
    validStatus: boolean;
    bufferRouteForEdit?: any;
    routesAndOption: any[];
  }

  export interface FleetMembers {
    validStatus: boolean;
    vesselsAndOptions: any[];
    vesselInSidebar?: any;
  }

  export interface CalculateParameters {
    validStatus: boolean;
    seaObjects: any[];
    onShoreObjects: any[];
    vesselToggleAnchor: any[];
    priorityHigh?: any;
    priorityMid?: any;
    priorityLow?: any;
    portDues: any[];
    costFuel?: any;
    costFreight: boolean;
    safetyReserve?: any;
    dayBeforePeriod?: any;
  }

  export interface PlanValidation {
    workRestrictions: any[];
    iterationsCount?: any;
  }

  export interface RootObject {
    validStatus?: any;
    scenarioId?: any;
    scenarioTitle: string;
    isInputDataCalculated: boolean;
    isFleetPlanDevelopmentCalculated: boolean;
    isPlanValidationCalculated: boolean;
    inputData: InputData;
    platformsList: PlatformsList;
    portsList: PortsList;
    routesList: RoutesList;
    fleetMembers: FleetMembers;
    calculateParameters: CalculateParameters;
    planValidation: PlanValidation;
    savedDate: number;
  }
}
