import { Configuration } from 'src/configuration/configuration';
import { Weather } from './weather';

export class WeatherGenerator {
  private possibleWeathers: Weather[] = [
    Weather.overcast,
    Weather.sunny,
    Weather.rainstorm,
    Weather.storm,
  ];
  /**
   *
   */
  constructor(private configuration: Configuration) {}
  public getWeather(iteration: number) {
    if (this.configuration.weather) {
      let currentIterationMax = 0;

      for (const weather of this.configuration.weather) {
        currentIterationMax += weather.iteration;
        if (currentIterationMax > iteration) {
          switch (weather.type) {
            case 'overcast':
              return Weather.overcast;
            case 'rainstorm':
              return Weather.rainstorm;
            case 'storm':
              return Weather.storm;
            case 'sunny':
              return Weather.sunny;
            default:
              throw new Error(
                `Unknown weather type '${weather.type}' in configuration at iteration ${iteration}.`
              );
          }
        }
      }
    }

    return this.possibleWeathers[
      iteration % this.possibleWeathers.length
      //Math.trunc(Math.random() * this.possibleWeathers.length)
    ];
  }
}
