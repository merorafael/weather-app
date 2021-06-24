import { action, computed, makeObservable, observable } from 'mobx'
import { persist } from 'mobx-persist'
import { GeoPosition } from '../services/LocationService'
import { getWeatherNow } from '../services/OpenWeatherService'

export enum WeatherUnitEnum {
  CELSIUS,
  FAHRENHEIT
}

export interface WeatherInterface {
  city?: string;
  condition?: string;
  temp?: number;
  min?: number;
  max?: number;
}

export class Weather {
  @persist @observable unit: WeatherUnitEnum = WeatherUnitEnum.CELSIUS
  @persist @observable city?: string
  @persist @observable condition?: string
  @persist @observable protected _temp?: number
  @persist @observable protected _min?: number
  @persist @observable protected _max?: number

  constructor (weather?: WeatherInterface) {
    makeObservable(this)

    this.city = weather?.city
    this.condition = weather?.condition
    this._temp = weather?.temp
    this._min = weather?.min
    this._max = weather?.max
  }

  @action
  setMetricUnit (unit: WeatherUnitEnum) {
    this.unit = unit
  }

  @computed
  get temp () {
    if (!this._temp) return

    return this.unit === WeatherUnitEnum.CELSIUS
      ? Math.round(this._temp)
      : Math.round(((this._temp * 9) / 5) + 32)
  }

  @computed
  get min () {
    if (!this._min) return

    return this.unit === WeatherUnitEnum.CELSIUS
      ? Math.round(this._min)
      : Math.round(((this._min * 9) / 5) + 32)
  }

  @computed
  get max () {
    if (!this._max) return

    return this.unit === WeatherUnitEnum.CELSIUS
      ? Math.round(this._max)
      : Math.round(((this._max * 9) / 5) + 32)
  }
}

export class WeatherStoreImpl {
  @persist('object') @observable now?: Weather

  constructor () {
    makeObservable(this)
  }

  @action
  loadFromAPI (position: GeoPosition) {
    getWeatherNow(position).then(action(weatherNow => {
      const weather = new Weather(weatherNow)
      if (this.now) {
        weather.unit = this.now.unit
      }

      this.now = weather
    }))
  }
}

export const WeatherStore = new WeatherStoreImpl()
