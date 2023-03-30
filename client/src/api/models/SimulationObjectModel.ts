export declare module SimulationObjectModel {
  export interface InputData {
    validStatus: boolean;
    projectType: string;
    details: string;
    imitationDateStart: string;
    imitationDateEnd: string;
  }

  export interface PlatformAndOption {
    platformId: number;
    platform_scenario_mobDemobDates: string[];
    platform_scenario_moveSpeed: number;
    platform_scenario_anchorageTime: number;
    platform_scenario_deAnchorageTime: number;
    platform_scenario_dislocationPortId: number;
    platform_scenario_startOfSupply: string;
    platform_scenario_oilLoadingWindows: any[];
    mtrBinaryAttachedExcelFileData?: any;
    platform_scenario_mtrListJson: string;
    expenseBinaryAttachedExcelFileData?: any;
    platform_scenario_expenseListJson: string;
  }

  export interface PlatformsList {
    validStatus: boolean;
    platformAndOptions: PlatformAndOption[];
  }

  export interface PortsList {
    validStatus: boolean;
    portsIds: number[];
  }

  export interface RoutesAndOption {
    routeId: number;
  }

  export interface RoutesList {
    validStatus: boolean;
    routesAndOption: RoutesAndOption[];
  }

  export interface VesselsAndOption {
    vesselId: number;
    vessel_scenario_startPortId: number;
    vessel_scenario_mobDemobDates: string[][];
    vessel_scenario_toirDates: any[];
    vessel_scenario_vesselGroup: number;
  }

  export interface FleetMembers {
    validStatus: boolean;
    vesselsAndOptions: VesselsAndOption[];
  }

  export interface PortDue {
    vesselId: number;
    portId: number;
    dueValue: number;
  }

  export interface CalculateParameters {
    validStatus: boolean;
    portDues: PortDue[];
    seaObjects: number[];
    onShoreObjects: number[];
    vesselToggleAnchor: number[];
    priorityHigh?: any;
    priorityMid?: any;
    priorityLow?: any;
    costFuel: number;
    costFreight: boolean;
    safetyReserve: number;
    dayBeforePeriod: number;
  }

  export interface PlanValidation {
    workRestrictions: any[][];
    iterationsCount?: any;
  }

  export interface Scenario {
    scenarioId: number;
    scenarioTitle: string;
    savedDate: number;
    inputData: InputData;
    platformsList: PlatformsList;
    portsList: PortsList;
    routesList: RoutesList;
    fleetMembers: FleetMembers;
    calculateParameters: CalculateParameters;
    planValidation: PlanValidation;
  }

  export interface Summer {
    min: number;
    average: number;
    max: number;
  }

  export interface Winter {
    min?: any;
    average?: any;
    max?: any;
  }

  export interface ProcessingTime {
    summer: Summer;
    winter: Winter;
  }

  export interface Platform {
    platformId: number;
    platformTitle: string;
    coordinates: number[];
    deckArea?: any;
    placeForChemicalReagents?: any;
    placeForContainers?: any;
    usefulAreaWithoutOther?: any;
    carryingCapacity?: any;
    tanks: any[];
    staffMaximumCount?: any;
    vesselServiceCount?: any;
    processingTime: ProcessingTime;
  }

  export interface Summer2 {
    min: number;
    average: number;
    max: number;
  }

  export interface Winter2 {
    min: number;
    average: number;
    max: number;
  }

  export interface ProcessingTime2 {
    summer: Summer2;
    winter: Winter2;
  }

  export interface Port {
    portId: number;
    portTitle: string;
    coordinates: number[];
    vesselServiceCount: number;
    processingTime: ProcessingTime2;
  }

  export interface Route {
    routeId: number;
    routeTitle: string;
    pointA: number;
    pointB: number;
    distance: number;
    refPoints: any[];
  }

  export interface Tank {
    tankId: number;
    tankTitle: string;
    mtrType: string;
    totalVolume?: any;
    usefulVolume: number;
    tankGroup?: any;
  }

  export interface Vessel {
    fuelConsumptionNearPlatformSummer: number;
    fuelConsumptionNearPlatformWinter: number;
    vesselId: number;
    vesselTitle: string;
    vesselType: string;
    cabinCapacity: number;
    deckTotalArea?: any;
    deckUsefulArea: number;
    carryingCapacity?: any;
    tanks: Tank[];
    license: string;
    speedAverageSummer: number;
    speedAverageWinter: number;
    fuelConsumptionAverageSpeedSummer: number;
    fuelConsumptionAverageSpeedWinter: number;
    fuelConsumptionInPortSummer: number;
    fuelConsumptionInPortWinter: number;
    costMobilize: number;
    costDemobilize: number;
    costTotal?: any;
    leaseDuration?: any;
    costLease: number;
    devicesLARN?: boolean;
  }

  export interface RootObject {
    scenario: Scenario;
    platforms: Platform[];
    ports: Port[];
    routes: Route[];
    vessels: Vessel[];
  }
}
