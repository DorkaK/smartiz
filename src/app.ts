import * as fs from 'fs';
import * as path from 'path';

import { Simulation } from './engine/simulation';
import { Field } from './entities/field';
import { SeaCow } from './entities/sea-cow';
import { SeaGrass } from './entities/sea-grass';
import { Algae } from './entities/algae';
import { Configuration } from './configuration/configuration';

// Create simulation instance
let simulation = new Simulation();

// Read the file '../simulations/simulation.json'
// Parse as a js object
// Cast as a Configuration object
const configuration = <Configuration>(
  JSON.parse(
    fs
      .readFileSync(path.join(__dirname, '../simulations/simulation.json'))
      .toString()
  )
);

// const parameter = [0.05, 0.1, 0.15];
// const parameter = [0.1, 0.25, 0.5];
const parameter = [1, 5, 10];
const result = [0, 0, 0];

const runCount = 3;

for (let e = 0; e < parameter.length; e++) {
  for (let i = 0; i < runCount; i++) {
    //configuration['sea-cow'].algaeEnergy = parameter[e]!;
    //configuration.algae.minimumLightToGrow = parameter[e]!;
    configuration['sea-cow'].maxSteps = parameter[e]!;

    // Initialize the simulation from the configuration
    simulation.init(configuration);

    // simulation.draw();

    // Run the simulation
    simulation.run(configuration.iterations);

    result[e] += simulation.endCows / simulation.startCows;
  }
}

console.log(result.map((m) => m / runCount));

// simulation.draw();

// Write the final state of the simulation to '../simulations/result.json'
fs.writeFileSync(
  path.join(__dirname, '../simulations/result.json'),
  JSON.stringify(simulation.fields, undefined, 2)
);
