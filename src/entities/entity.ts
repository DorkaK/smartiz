import { SimulationContext } from '../engine/simulation-context';

export abstract class Entity {
  public abstract type: string;

  /**
   * Executes a step in the simulation for this entity.
   */
  public step(context: SimulationContext) {
    console.log('entity step');
  }
}
