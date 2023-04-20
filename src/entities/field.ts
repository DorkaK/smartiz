import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';

export class Field extends Entity {
  public type: string = 'Field';

  public entities: Entity[] = [];

  public x: number = 0;
  public y: number = 0;

  public override step(context: SimulationContext): void {
    for (const entity of [...this.entities]) {
      entity.step({
        ...context
      });
    }
  }
}
