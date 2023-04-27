import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';

export class Algae extends Entity {
  public type: string = 'Algae';

  /**
   * Fill percentage (0-1) in the field.
   */
  public fill: number = 0;

  /**
   * How much light (0-1) can penetrate the algae field.
   */
  public get opacity(): number {
    return 1 - this.fill;
  }

  // growthRate: number;

  public override step(context: SimulationContext): void {
    // light sensitive if
    if (
      context.light / this.opacity >=
      context.simulation.configuration.algae.minimumLightToGrow
    ) {
      // active
      // make oxygen
      // grow
      this.fill = this.fill * 1.5; // light level + get it from configuration
      if (this.fill > 1) {
        // go to next field
        // context.field.x, context.field.y

        let nextField = context.simulation.tryGetField(context.field.x + 1, context.field.y)
        if (nextField) {
          // nextField
        }
        else {

        }

        // no algae => add algae
        // has algae => add to fill
        // has algae fill 1 => next field
        // no more field => overgrow => death / no action
        // death => compost => less oxygen, more nitrogen
      }

    } else {
      // sleep
      // oxygen consumption
      // no oxygen => death
    }
  }

  // growth rate / nitrate effect?
  // possible duplication of size within hours
  // 1 month to reach 1 fill
}
