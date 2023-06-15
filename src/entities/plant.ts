import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';

export abstract class Plant extends Entity {
  private _fill: number;
  public get fill(): number {
    return this._fill;
  }
  public set fill(value: number) {
    if (value < 0) {
      debugger;
    }
    if (value > 1) {
      debugger;
    }
    this._fill = value;
  }

  protected abstract create(): Plant;

  protected grow(context: SimulationContext, growth: number) {
    if (growth <= 1) {
      this.fill = growth;
    } else {
      this.fill = 1;
      // expansion phase
      this.growOnBorders(context);
    }
  }

  protected growOnField(context: SimulationContext, x: number, y: number) {
    let isThereAlready = false;
    const nextField = context.simulation.tryGetField(x, y);

    if (nextField) {
      for (const entity of nextField.entities) {
        if (entity.type == this.type) {
          const plant = entity as Plant;
          if (plant.fill < 1) {
            plant.fill += 0.01;
          }
          isThereAlready = true;
          break;
        }
      }

      if (!isThereAlready) {
        const newEntity = this.create();
        newEntity.fill = 0.01;
        nextField.entities.push(newEntity);
      }
    }
  }

  protected growOnBorders(context: SimulationContext) {
    this.growOnField(context, context.field.x + 1, context.field.y);
    this.growOnField(context, context.field.x - 1, context.field.y);
    this.growOnField(context, context.field.x, context.field.y + 1);
    this.growOnField(context, context.field.x, context.field.y - 1);
  }
}
