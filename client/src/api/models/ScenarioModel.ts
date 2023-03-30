export type ScenarioShortModel = {
  scenarioTitle: string;
  savedDate: number; // тут на самом деле дата в млс
  scenarioId: number;
};

export type ListScenariosResponse = Array<ScenarioShortModel>;
