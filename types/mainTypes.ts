export interface WeatherData {
  city: {
    name: string;
  };
  list: Array<{
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
    }>;
    dt_txt: string;
  }>;
}
