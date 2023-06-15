import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';
import { Plant } from './plant';

export class SeaGrass extends Plant {
  public type: string = 'Sea grass';

  protected create(): Plant {
    return new SeaGrass();
  }

  public override step(context: SimulationContext): void {
    // growth phase
    if (context.isDay && this.fill < 1) {
      // growth rate of grass: 0.04
      // influence of light on growth rate: context.light + 1

      /*
 0 => 1
 1 => 1.04
 2 => 1.08
 */

      const growth = Math.min(
        1,
        this.fill +
          context.light *
            (1 + context.simulation.configuration['sea-grass'].rate_of_growth)
      );

      this.grow(context, growth);
    }
  }
}
