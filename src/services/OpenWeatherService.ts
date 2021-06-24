import axios from 'axios'
import { GeoPosition } from './LocationService'
import { WeatherInterface } from '../stores/WeatherStore'
import { WEATHER_API_URL, WEATHER_API_KEY } from '@env'

const appid = WEATHER_API_KEY
const client = axios.create({
  baseURL: WEATHER_API_URL
})

export const getWeatherNow = async ({ long, lat }: GeoPosition): Promise<WeatherInterface> => {
  const { data } = await client.get('/weather', {
    params: {
      lon: long,
      lat,
      appid,
      units: 'metric'
    }
  })

  return {
    city: data?.name || 'Unknown',
    condition: data?.weather[0]?.main || 'Unknown',
    temp: data?.main.temp,
    min: data?.main.temp_min,
    max: data?.main.temp_max
  }
}
