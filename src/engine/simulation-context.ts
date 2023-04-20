import { Field } from '../entities/field';
import { Simulation } from './simulation';

export interface SimulationContext {
  simulation: Simulation;
  field: Field;
  iteration: number;
  light: number;
  isDay: boolean;
}
