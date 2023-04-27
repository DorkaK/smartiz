import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';

export class Field extends Entity {
  public type: string = 'Field';

  public entities: Entity[] = [];

  public x: number = 0;
  public y: number = 0;

  // local oxygen
  
  /**
   * Create a Field instance on the given coordinates.
   * 
   * @argument x X coordinate of the field.
   * @argument y Y coordinate of the field.
   */
  constructor(x: number, y: number) {
    super();

    this.x = x;
    this.y = y;
  }

  public override step(context: SimulationContext): void {
    for (const entity of [...this.entities]) {
      entity.step({
        ...context
      });
    }
  }
}
