import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { persist } from 'mobx-persist'
import { GeoPosition } from '@/services/LocationService'
import { getWeatherNow, WeatherInterface, WeatherUnitEnum } from '@/services/OpenWeatherService'
import moment, { Moment } from 'moment'
import { Themes } from '@/themes'

export class Weather implements WeatherInterface {
  @persist @observable unit: WeatherUnitEnum
  @persist @observable city?: string
  @persist @observable condition?: string
  @persist @observable protected _temp?: number
  @persist @observable protected _min?: number
  @persist @observable protected _max?: number
  @persist @observable sunrise?: Moment
  @persist @observable sunset?: Moment

  constructor (weather: WeatherInterface) {
    makeObservable(this)

    this.unit = weather.unit || WeatherUnitEnum.CELSIUS
    this.city = weather?.city
    this.condition = weather?.condition
    this._temp = weather?.temp
    this._min = weather?.min
    this._max = weather?.max
    this.sunrise = weather?.sunrise
    this.sunset = weather?.sunset
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

  @computed
  get theme () {
    if (!this.condition) return
    const condition = this.condition?.toLocaleLowerCase()
    const { day, night } = Themes[condition]

    if (!this.sunrise || !this.sunset) {
      return day
    }

    const currentTime = moment()
    return ((this.sunrise < currentTime) && (this.sunset > currentTime))
      ? day
      : night
  }
}

export class WeatherStoreImpl {
  @persist('object') @observable now?: Weather

  constructor () {
    makeObservable(this)
  }

  @action
  async loadFromAPI (position: GeoPosition) {
    const weatherData = await getWeatherNow(position)
    runInAction(() => {
      this.now = new Weather(weatherData)
    })
  }
}

export const WeatherStore = new WeatherStoreImpl()
