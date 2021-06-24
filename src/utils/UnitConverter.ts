import { WeatherUnitEnum } from '../stores/WeatherStore'

export const convertCelsiusToAnotherUnit = (temp: number, unit = WeatherUnitEnum.CELSIUS) => {
  return unit === WeatherUnitEnum.CELSIUS
    ? Math.round(temp)
    : Math.round(((temp * 9) / 5) + 32)
}
