import { SimulationContext } from '../engine/simulation-context';
import { Algae } from './algae';
import { Entity } from './entity';
import { SeaGrass } from './sea-grass';

export class SeaCow extends Entity {
  public type: string = 'Sea cow';

  public cowstomach: number = 1;

  // speed 24 km/h max, 8 km/h normal, ? km/h during eating

  public override step(context: SimulationContext): void {
    this.cowstomach -= 0.4;
    if (this.cowstomach < 0) {
      this.cowstomach = 0;
    }

    // sleep
    if (!context.isDay) {
      return;
    }

    if (context.field) {
      let move = 0;

      let x_change = 0;
      let y_change = 0;

      const grazing = (): boolean => {
        let grazingField = context.simulation.tryGetField(
          context.field.x + x_change,
          context.field.y + y_change
        );
        if (!grazingField) return false;

        let hadSeaGrass = false;

        for (const entity of grazingField.entities) {
          if (entity instanceof SeaGrass) {
            hadSeaGrass = entity.fill > 0.01;

            // munch munch, but we don't kill the whole seagrass
            if (this.cowstomach + Math.max(0, entity.fill - 0.01) > 1) {
              entity.fill -= 1 - this.cowstomach;
              this.cowstomach = 1;

              break;
            } else {
              this.cowstomach += entity.fill - 0.01;
              entity.fill = 0.01;
            }
          }
        }

        if (!hadSeaGrass) {
          for (const entity of grazingField.entities) {
            if (entity instanceof Algae) {
              if (
                this.cowstomach +
                  Math.max(0, entity.fill - 0.01) *
                    context.simulation.configuration['sea-cow'].algaeEnergy >
                1
              ) {
                entity.fill -=
                  (1 - this.cowstomach) *
                  (1 / context.simulation.configuration['sea-cow'].algaeEnergy);
                this.cowstomach = 1;

                break;
              } else {
                this.cowstomach +=
                  (entity.fill - 0.01) *
                  context.simulation.configuration['sea-cow'].algaeEnergy;
                entity.fill = 0.01;
              }
            }
          }
        }

        return true;
      };

      while (
        this.cowstomach < 1 &&
        move < context.simulation.configuration['sea-cow'].maxSteps
      ) {
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

      if (this.cowstomach <= 0.05) {
        // dies :(
        const index = context.field.entities.indexOf(this);
        context.field.entities.splice(index, 1);
      } else {
        // move
        if (x_change != 0 || y_change != 0) {
          const index = context.field.entities.indexOf(this);
          context.field.entities.splice(index, 1);
          let final_newfield = context.simulation.tryGetField(
            context.field.x + x_change,
            context.field.y + y_change
          );
          final_newfield?.entities.push(this);
        }
      }
    }
  }
}
