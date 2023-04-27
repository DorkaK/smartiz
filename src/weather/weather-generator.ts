import { Weather } from "./weather";

export class WeatherGenerator {
    private possibleWeathers: Weather[] = [
        Weather.overcast,
        Weather.sunny,
        Weather.rainstorm,
        Weather.storm,
    ];

    public getWeather(iteration: number) {
        return this.possibleWeathers[Math.trunc(Math.random() * this.possibleWeathers.length)];
    }
}