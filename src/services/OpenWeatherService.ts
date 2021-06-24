import axios from 'axios'
import { GeoPosition } from './LocationService'
import { WeatherInterface } from '../stores/WeatherStore'

const appid = 'd68155d373179f215e43ba571f9acb10'
const client = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
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
