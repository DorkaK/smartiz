import { Configuration } from "src/configuration/configuration";
import { Weather } from "./weather";

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
    constructor(private configuration: Configuration) {
        
    }
    public getWeather(iteration: number) {
        this.configuration.weather[0]
        return this.possibleWeathers[Math.trunc(Math.random() * this.possibleWeathers.length)];
    }
    public getIteration(){
        return this.configuration.weather[0]
    }
}

//túl sok iteráció 
//ismeretlen weather