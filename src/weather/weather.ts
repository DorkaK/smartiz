export class Weather {
  public static sunny = new Weather(1);
  public static overcast = new Weather(0.75);
  public static rainstorm = new Weather(0.5);
  public static storm = new Weather(0.25);
  
  /** Light effectiveness (0-1). */
  public light: number;
  // wind? effect on water? mist and clay mixing in the water?

  constructor(light: number){
    this.light = light
  }
}

// align with configuration
// adding a time "limit"
