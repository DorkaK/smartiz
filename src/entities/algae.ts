import { SimulationContext } from '../engine/simulation-context';
import { Entity } from './entity';



export class Algae extends Entity {
  public type: string = 'Algae';

  /**
   * Fill percentage (0-1) in the field.
   */
  public fill: number = 0;

  /**
   * How much light (0-1) can penetrate the algae field.
   */
  public get opacity(): number {
    return 1 - this.fill;
  }

  // growthRate: number;

  public override step(context: SimulationContext): void {
    // light sensitive if
    if (context.light / this.opacity >= context.simulation.configuration.algae.minimumLightToGrow) {
      // active
      // make oxygen
      // grow
      const growth = this.fill * 1.2;

	    if (growth <= 1){
		    this.fill = growth;
      }

      if (growth > 1) {
	      this.fill = 1;
      }

        // go to next field
        // context.field.x, context.field.y

      if (this.fill == 1) {
          let isThereAlgae = false
          let nextField = context.simulation.tryGetField(context.field.x + 1, context.field.y)
          if (nextField) {
            for (const entity of nextField.entities) {
             if (entity.type == 'Algae' && (entity as Algae).fill <= 1 - 0.01 && !isThereAlgae) {
                (entity as Algae).fill += 0.01;
                isThereAlgae = true;
              }
            }
            if (!isThereAlgae){
              const algae = new Algae();
              context.field.entities.push(algae);
            }
            isThereAlgae = false;   
          }

          nextField = context.simulation.tryGetField(context.field.x - 1, context.field.y)
          if (nextField) {

            for (const entity of nextField.entities){
              if (entity.type == 'Algae' && (entity as Algae).fill <= 1 - 0.01 && !isThereAlgae){
                (entity as Algae).fill += 0.01;
                isThereAlgae = true;
              }
            }
            if (!isThereAlgae){
              const algae = new Algae();
              context.field.entities.push(algae);
            }
            isThereAlgae = false;
          }

          nextField = context.simulation.tryGetField(context.field.x, context.field.y + 1)
          if (nextField) {
            for (const entity of nextField.entities){
              if (entity.type == 'Algae' && (entity as Algae).fill <= 1 - 0.01 && !isThereAlgae){
                (entity as Algae).fill += 0.01;
                isThereAlgae = true;
              }
            }
            if (!isThereAlgae){
              const algae = new Algae();
              context.field.entities.push(algae);
            }
            isThereAlgae = false;
          }

          nextField = context.simulation.tryGetField(context.field.x, context.field.y + 1)
          if (nextField) {
            for (const entity of nextField.entities){
              if (entity.type == 'Algae' && (entity as Algae).fill <= 1 - 0.01 && !isThereAlgae){
                (entity as Algae).fill += 0.01;
                isThereAlgae = true
              }
            }
            if (!isThereAlgae){
              const algae = new Algae();
              context.field.entities.push(algae);
            }
          }
        }
      }
      else {
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