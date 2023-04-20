export class Weather {
  /** Light effectiveness (0-1). */
  public light: number;
  // wind? effect on water? mist and clay mixing in the water?

  constructor(light: number){
    this.light = light
  }
}
let sunny = new Weather(1);
let overcast = new Weather(0.75);
let rainstorm = new Weather(0.5);
let storm = new Weather(0.25);

let weather_options = []
weather_options.push(Weather)
console.log(weather_options)

// align with configuration
