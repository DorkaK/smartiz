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

  growthRate: number;

  public override step(context: SimulationContext): void {
    // phase sleep, active, active

    // light sensitive if
    if (
      context.light / this.opacity >=
      context.simulation.configuration.algae.minimumLightToGrow
    ) {
      // active
    } else {
      // sleep
    }
  }

  // growth rate / nitrate effect?
  // oxygen output
  // possible duplication of size within hours
  // 1 month to reach 1 fill

  constructor(fill: number, opacity: number, growthRate: number){
    super();
    this.fill = fill;
    this. growthRate = growthRate;
  }

}
