import * as fs from 'fs';
import * as path from 'path';

import { Simulation } from './engine/simulation';
import { Field } from './entities/field';
import { SeaCow } from './entities/sea-cow';
import { SeaGrass } from './entities/sea-grass';
import { Algae } from './entities/algae';
import { Configuration } from './configuration/configuration';

let simulation = new Simulation();

const configuration = <Configuration>(
  JSON.parse(
    fs
      .readFileSync(path.join(__dirname, '../src/simulations/simulation.json'))
      .toString()
  )
);

simulation.init(configuration);

simulation.draw();

simulation.run(configuration.iterations);

simulation.draw();
