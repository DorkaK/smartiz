import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';
import { SeaGrass } from './sea-grass';

export class SeaCow extends Entity {
  public override step(context: SimulationContext): void {
    // sleep
    if (context.field) {
      let i = 0;
      let isMunchSuccessful = false;
      for (const entity of context.field.entities) {
        if (entity instanceof SeaGrass) {
          // munch munch
          context.field.entities.splice(i, 1);
          console.log('sea cow munch munch');
          isMunchSuccessful = true;
          break;
        }
        i++;
      }

      if (!isMunchSuccessful) {
        // move
        // context.simulation.entities
      }
    }

    console.log('sea cow step');
  }
}
