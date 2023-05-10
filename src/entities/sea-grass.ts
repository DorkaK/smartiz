import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';

export class SeaGrass extends Entity {
  public type: string = 'Sea grass';

  /**
   * Fill percentage (0-1) in the field.
   */
  public fill: number = 0;

  public override step(context: SimulationContext): void {
    // growth phase
    if (context.isDay && this.fill < 1){
      // growth rate of grass: 0.04
      // influence of light on growth rate: context.light + 1

      const growth = this.fill * (context.light + 1) *0.04;
      if (growth <= 1) {
        this.fill = growth;
      }
    }

    // expansion phase
    if (this.fill == 1) {
      let nextField = context.simulation.tryGetField(context.field.x + 1, context.field.y)
      if (nextField) {
        for (const entity of nextField.entities) {
          if (entity.type == 'Sea grass' && (entity as SeaGrass).fill <= 1 - 0.01) {
            (entity as SeaGrass).fill += 0.01;
          }
        }
      }

      nextField = context.simulation.tryGetField(context.field.x - 1, context.field.y)
      if (nextField) {
        // TODO
      }

      nextField = context.simulation.tryGetField(context.field.x, context.field.y + 1)
      if (nextField) {
        // TODO
      }

      nextField = context.simulation.tryGetField(context.field.x, context.field.y - 1)
      if (nextField) {
        // TODO
      }
    }

    console.log('sea grass');
  }
}
