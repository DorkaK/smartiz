export interface Map {
  width: number;
  height: number;
}

export interface Weather {
  iteration: number;
  type: string;
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

export interface SeaGrass {
  maximum: number;
  minimum: number;
  rate_of_growth : number;
}

export interface Configuration {
  iterations: number;
  map: Map;
  weather: Weather[];
  'sea-cow': SeaCow;
  'sea-grass' : SeaGrass;
  algae: Algae;
}
