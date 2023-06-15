import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';
import { SeaGrass } from './sea-grass';

export class SeaCow extends Entity {
  public type: string = 'Sea cow';

  // speed 24 km/h max, 8 km/h normal, ? km/h during eating

  public override step(context: SimulationContext): void {
    // sleep
    if (!context.isDay) {
      return;
    }

    if (context.field) {
      let move = 0;
      let cowstomach = 0;

      let x_change = 0;
      let y_change = 0;

      function grazing(): boolean {
        let grazingField = context.simulation.tryGetField(context.field.x + x_change, context.field.y + y_change)
        if (!grazingField) return false;

        for (const entity of grazingField.entities) {
          const grass = entity as SeaGrass;
          if (grass) {
            // munch munch, but we don't kill the whole seegrass
            if (cowstomach + grass.fill - 0.01 > 1) {
              grass.fill -= 1 - cowstomach;
              cowstomach = 1;

              break;
            } else {
              cowstomach += grass.fill - 0.01;
              grass.fill = 0.01;
            }
          }
        }

        return true;
      }

      while (cowstomach < 1 && move < 5) {
        let randomDirectionandomDirection = Math.trunc(Math.random() * 4);

        switch (randomDirectionandomDirection) {
          case 0:
            y_change++;
            break;
          case 1:
            y_change--;
            break;
          case 2:
            x_change++;
            break;
          case 3:
            x_change--;
            break;
        }

        move++;

        // Out of bounds, try again
        if (!grazing()) {
          move--;

          switch (randomDirectionandomDirection) {
            case 0:
              y_change--;
              break;
            case 1:
              y_change++;
              break;
            case 2:
              x_change--;
              break;
            case 3:
              x_change++;
              break;
          }
        }
      }

      if (cowstomach <= 0.1) {
        // dies :(
        const index = context.field.entities.indexOf(this);
        context.field.entities.splice(index, 1);
      } else {
        // move
        if (x_change != 0 || y_change != 0) {
          const index = context.field.entities.indexOf(this);
          context.field.entities.splice(index, 1);
          let final_newfield = context.simulation.tryGetField(context.field.x + x_change, context.field.y + y_change)
          final_newfield?.entities.push(this);
        }
      }
    }
  }
}
