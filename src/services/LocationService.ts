import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import WithoutPermissionError from '../errors/WithoutPermissionError'

export interface GeoPosition {
  long: number;
  lat: number;
}

export const watchPosition = async (callback: (position: GeoPosition) => void) => {
  const callbackProcessor = (location: LocationObject) => {
    const { coords } = location
    const position: GeoPosition = {
      long: coords.longitude,
      lat: coords.latitude
    }

    callback(position)
  }

  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    throw new WithoutPermissionError()
  }

  await Location.watchPositionAsync({
    accuracy: Location.Accuracy.Highest,
    distanceInterval: 1000
  }, (location) => {
    callbackProcessor(location)
  })
}
