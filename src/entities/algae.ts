import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';
import { Plant } from './plant';

export class Algae extends Plant {
  public type: string = 'Algae';

  /**
   * How much light (0-1) can penetrate the algae field.
   */
  public get opacity(): number {
    return 1 - this.fill;
  }

  protected create(): Plant {
    return new Algae();
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
      const growth = Math.min(1, this.fill * 1.2); // should be coming from config

      this.grow(context, growth);
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
//seagrass is help
