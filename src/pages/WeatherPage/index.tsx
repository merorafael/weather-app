import React, { useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { Video } from 'expo-av'
import styled from 'styled-components/native'

import { watchPosition } from '../../services/LocationService'

import WeatherNow from '../../components/WeatherNow/index'
import { observer } from 'mobx-react-lite'
import { WeatherStoreImpl, WeatherUnitEnum } from '../../stores/WeatherStore'

const MainView = styled.View`
  flex: 1;
  justify-content: center;
`

const WeatherView = styled.View`
  flex: 1;
  justify-content: flex-start;
`

const WeatherDataView = styled.View`
  flex: 1;
  background-color: rgba(51, 51, 51, 0.5);
  justify-content: flex-start;
`

const BackgroundVideo = styled(Video)`
  position: absolute;
  align-items: stretch;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const DataView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${Constants.statusBarHeight}px;
  padding-horizontal: 24px;
`

const ActionView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding-vertical: 15px;
  padding-horizontal: 24px;
  background-color: #000;
`

const UnitButton = styled.Text`
  color: #FFF
  margin-horizontal: 5px
  font-size: 15px
`

const Text = styled.Text`
  text-shadow-color: #333;
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 3px;
  color: #FFF;
`
interface WeatherPageProps {
  weatherStore: WeatherStoreImpl
}

const WeatherPage: React.FC<WeatherPageProps> = observer(({ weatherStore }) => {
  useEffect(() => {
    watchPosition(currentPosition => {
      weatherStore.loadFromAPI(currentPosition)
    }).catch(() => {
      console.log('Erro!')
    })
  }, [])

  const conditionsBackgrounds = {
    Rain: require('../../../assets/weather/condition/Rain.mp4'),
    Clear: require('../../../assets/weather/condition/Clear.mp4'),
    Thunderstorm: require('../../../assets/weather/condition/Clear.mp4'),
    Clouds: require('../../../assets/weather/condition/Clear.mp4'),
    Snow: require('../../../assets/weather/condition/Snow.mp4'),
    Drizzle: require('../../../assets/weather/condition/Clear.mp4'),
    Haze: require('../../../assets/weather/condition/Haze.mp4'),
    Mist: require('../../../assets/weather/condition/Mist.mp4')
  }

  return (
    <MainView>
      { weatherStore.now
        ? <WeatherView>
            <BackgroundVideo
              source={conditionsBackgrounds[weatherStore.now.condition]}
              isLooping
              isMuted={true}
              shouldPlay
              resizeMode="cover" />
            <WeatherDataView>
              <DataView>
                <WeatherNow now={{
                  unit: weatherStore?.now.unit,
                  city: weatherStore?.now.city,
                  condition: weatherStore?.now.condition,
                  temp: weatherStore?.now.temp,
                  min: weatherStore?.now.min,
                  max: weatherStore?.now.max
                }} />
              </DataView>
              <ActionView>
                <TouchableOpacity onPress={() => weatherStore?.now?.setMetricUnit(WeatherUnitEnum.CELSIUS)}>
                  <UnitButton>C⁰</UnitButton>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => weatherStore?.now?.setMetricUnit(WeatherUnitEnum.FAHRENHEIT)}>
                  <UnitButton>F⁰</UnitButton>
                </TouchableOpacity>
              </ActionView>
            </WeatherDataView>
          </WeatherView>
        : <ActivityIndicator size="large" color="#0000ff" />
      }
      <StatusBar style="auto" />
    </MainView>
  )
})

export default WeatherPage
