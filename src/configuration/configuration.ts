export interface Map {
  width: number;
  height: number;
}

export interface Weather {
  iteration: number;
  light: number;
}

export interface SeaCow {
  maximum: number;
  minimum: number;
}

export interface Algae {
  maximum: number;
  minimum: number;
  minimumLightToGrow: number;
}

export interface Configuration {
  iterations: number;
  map: Map;
  weather: Weather[];
  'sea-cow': SeaCow;
  algae: Algae;
}
