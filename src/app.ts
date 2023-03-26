// TODO

import { Simulation } from './engine/simulation';
import { Field } from './entities/field';
import { SeaCow } from './entities/sea-cow';
import { SeaGrass } from './entities/sea-grass';

let simulation = new Simulation();

simulation.init(3);

simulation.fields[0]![0]!.entities.push(new SeaGrass());
simulation.fields[0]![0]!.entities.push(new SeaCow());
simulation.fields[0]![0]!.entities.push(new SeaCow());

simulation.draw();

simulation.run(3);

simulation.draw();
