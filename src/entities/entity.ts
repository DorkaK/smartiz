import { SimulationContext } from '../engine/simulation-context';

export class Entity {
  /**
   * Executes a step in the simulation for this entity.
   */
  public step(context: SimulationContext) {
    console.log('entity step');
  }
}
