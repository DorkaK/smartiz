import { Configuration } from '../configuration/configuration';
import { Algae } from '../entities/algae';
import { Entity } from '../entities/entity';
import { Field } from '../entities/field';
import { SeaCow } from '../entities/sea-cow';
import { SeaGrass } from '../entities/sea-grass';
import { WeatherGenerator } from '../weather/weather-generator';

/**
 * Simulation runner.
 */
export class Simulation {
  // settings
  public configuration: Configuration;

  public weatherGenerator: WeatherGenerator;

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

  /**
   * Fields with y and x coordinates.
   *
   * @example fields[y][x]
   */
  public fields: Field[][] = [];

  public getField(x: number, y: number): Field {
    if (this.fields.length <= y)
      throw new Error('Y is outside of the simulation boundries.');
    if (this.fields[y]!.length <= x)
      throw new Error('X is outside of the simulation boundries.');

    return this.fields[y]![x]!;
  }

  public tryGetField(x: number, y: number): Field | undefined {
    if (x < 0 || y < 0) return undefined;
    if (this.fields.length <= y) return undefined;
    if (this.fields[y]!.length <= x) return undefined;

    return this.fields[y]![x]!;
  }

  /**
   * Initialize the simulation.
   */
  public init(configuration: Configuration) {
    this.configuration = configuration;
    this.weatherGenerator = new WeatherGenerator(configuration);

    let totalCow = 0;

    for (let y = 0; y < configuration.map.height; y++) {
      const row: Field[] = [];
      this.fields.push(row);
      for (let x = 0; x < configuration.map.width; x++) {
        const field = new Field(x, y);

        // Configure field starting entities
        const algae = new Algae();
        algae.fill =
          Math.random() *
            (configuration.algae.maximum - configuration.algae.minimum) +
          configuration.algae.minimum;
        field.entities.push(algae);

        const seaGrass = new SeaGrass();
        seaGrass.fill =
          Math.random() *
            (configuration['sea-grass'].maximum -
              configuration['sea-grass'].minimum) +
          configuration['sea-grass'].minimum;
        field.entities.push(seaGrass);

        const cows = Math.trunc(
          Math.random() *
            (configuration['sea-cow'].maximum -
              configuration['sea-cow'].minimum) +
            configuration['sea-cow'].minimum
        );

        for (let i = 0; i < cows; i++) {
          // if (totalCow == 1) break;

          field.entities.push(new SeaCow());
          totalCow++;
        }

        row.push(field);
      }
    }

    console.log(`Starting cows: ${totalCow}`);
  }

  /**
   * Run the simulation a given number of times.
   * @param count Iteration count.
   */
  public run(count: number) {
    for (let i = 0; i < count; i++) {
      // 8h iteration
      for (const entity of this.getFields()) {
        entity.step({
          simulation: this,
          field: entity,
          iteration: i,
          light: this.getLight(entity, i),
          isDay: i % 3 != 0,
        });
      }
    }

    let totalCow = 0;

    for (const field of this.getFields()) {
      for (const entity of field.entities) {
        if (entity instanceof SeaCow) {
          totalCow++;
        }
      }
    }

    console.log(`Final cows: ${totalCow}`);
  }

  /**
   * Calculate the current light level in the simulation.
   */
  private getLight(field: Field, iteration: number): number {
    const weather = this.weatherGenerator.getWeather(iteration);

    let light = iteration % 3 != 0 ? weather?.light || 1 : 0;

    // Multiply with algae fill, because of opacity
    for (const entity of field.entities) {
      if (entity instanceof Algae) {
        light *= entity.opacity;
      }
    }

    if (light < 0) {
      debugger;
    }

    return light;
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
