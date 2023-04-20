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
      fill = fill * 1.5; // light level + get it from configuration
      // fill MAX 1!!!
      // go to next field
      // context.field.x, context.field.y
      // for (const field of context.simulation.getFields()) {
      //   if (field.x + 1 == context.field.x && field.y == context.field.y) {

      //   }
      // }

      // no algae => add algae
      // has algae => add to fill
      // has algae fill 1 => next field
      // no more field => overgrow => death / no action
      // death => compost => less oxigen, more nitrogen
    } else {
      // sleep
      // oxigen consumption
      // no oxygen => death
    }
  }

  // growth rate / nitrate effect?
  // possible duplication of size within hours
  // 1 month to reach 1 fill
}
