import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';

export class SeaGrass extends Entity {
  public override step(context: SimulationContext): void {
    // phase sleep, active

    console.log('sea grass');
  }
}
