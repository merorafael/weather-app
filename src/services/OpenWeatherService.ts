import axios from 'axios'
import moment, { Moment } from 'moment'
import { WEATHER_API_URL, WEATHER_API_KEY } from '@env'
import { GeoPosition } from './LocationService'
import { ThemeInterface } from '@/themes'

export enum WeatherUnitEnum {
  CELSIUS,
  FAHRENHEIT
}

export interface WeatherInterface {
  unit?: WeatherUnitEnum
  city?: string;
  condition?: string;
  temp?: number;
  min?: number;
  max?: number;
  sunrise?: Moment;
  sunset?: Moment;
  theme?: ThemeInterface;
}

const appid = WEATHER_API_KEY
const client = axios.create({
  baseURL: WEATHER_API_URL
})

export const getWeatherNow = async ({ long, lat }: GeoPosition, unit?: WeatherUnitEnum): Promise<WeatherInterface> => {
  const { data } = await client.get('/weather', {
    params: {
      lon: long,
      lat,
      appid,
      units: 'metric'
    }
  })

  return {
    unit: unit || WeatherUnitEnum.CELSIUS,
    city: data?.name || 'Unknown',
    condition: data?.weather[0]?.main || 'Unknown',
    temp: data?.main.temp || 0,
    min: data?.main.temp_min || 0,
    max: data?.main.temp_max || 0,
    sunrise: moment.unix(data?.sys.sunrise),
    sunset: moment.unix(data?.sys.sunset)
  }
}
