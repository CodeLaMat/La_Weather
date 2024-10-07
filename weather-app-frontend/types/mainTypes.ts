export interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
  city: City;
}

export interface FavoriteWeatherState {
  loading: boolean;
  weatherData: { [cityName: string]: CurrentWeatherData };
  error: string | null;
}

export interface WeatherItem {
  dt: number;
  main: MainInfo;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface MainInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Rain {
  "3h": number;
}

export interface Sys {
  type?: number;
  id?: number;
  message?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface CurrentWeatherData {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainInfo;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface LoadingState {
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isFetchingWeather: boolean;
  isRequestingPasswordReset: boolean;
  isResettingPassword: boolean;
}

export interface RegisterUserArgs {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export interface LoginUserArgs {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
  };
}

export interface AuthError {
  message: string;
}
