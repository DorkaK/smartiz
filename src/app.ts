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

// Initialize the simulation from the configuration
simulation.init(configuration);

// simulation.draw();

// Run the simulation
simulation.run(configuration.iterations);

// simulation.draw();

// Write the final state of the simulation to '../simulations/result.json'
fs.writeFileSync(
  path.join(__dirname, '../simulations/result.json'),
  JSON.stringify(simulation.fields, undefined, 2)
);
