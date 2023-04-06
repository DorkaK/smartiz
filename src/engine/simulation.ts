import { Configuration } from '../configuration/configuration';
import { Algae } from '../entities/algae';
import { Entity } from '../entities/entity';
import { Field } from '../entities/field';
import { SeaCow } from '../entities/sea-cow';
import { SeaGrass } from '../entities/sea-grass';

/**
 * Simulation runner.
 */
export class Simulation {
  // settings
  public configuration: Configuration;

  // output
  public *getEntities() {
    for (const row of this.fields) {
      for (const field of row) {
        for (const entity of field.entities) {
          yield entity;
        }
      }
    }
  }

  public *getFields() {
    for (const row of this.fields) {
      for (const field of row) {
        yield field;
      }
    }
  }

  public fields: Field[][] = [];

  /**
   * Initialize the simulation.
   */
  public init(configuration: Configuration) {
    this.configuration = configuration;

    for (let y = 0; y < configuration.map.height; y++) {
      const row: Field[] = [];
      this.fields.push(row);
      for (let x = 0; x < configuration.map.width; x++) {
        const field = new Field();

        // Configure field starting entities
        const algae = new Algae();
        algae.fill =
          Math.random() *
            (configuration.algae.maximum - configuration.algae.minimum) +
          configuration.algae.minimum;
        field.entities.push(algae);

        row.push(field);
      }
    }
  }

  /**
   * Run the simulation a given number of times.
   * @param count Iteration count.
   */
  public run(count: number) {
    for (let i = 0; i < count; i++) {
      console.log(`iteration: ${i}`);
      // 8h iteration
      for (const entity of this.getFields()) {
        entity.step({
          simulation: this,
          field: undefined,
          iteration: i,
          light: this.getLight(),
          isDay: i % 3 != 0,
        });
      }
    }
  }

  private getLight(): number {
    return 1;
  }

  public draw() {
    let drawing: string[] = [];
    for (const row of this.fields) {
      var firstRow = '';
      var secondRow = '';
      var thirdRow = '';
      for (const field of row) {
        firstRow += field.entities
          .filter((f) => f instanceof SeaCow)
          .length.toString()
          .padEnd(3, ' ');
        secondRow += field.entities
          .filter((f) => f instanceof SeaGrass)
          .length.toString()
          .padEnd(3, ' ');
        thirdRow += 'XXX';
      }
      drawing.push(firstRow);
      drawing.push(secondRow);
      drawing.push(thirdRow);
    }
    let text = '';
    for (const row of drawing) {
      text += row + '\n';
    }
    console.log(text);
  }
}
