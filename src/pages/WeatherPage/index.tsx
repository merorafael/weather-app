import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'
import { StatusBar } from 'expo-status-bar'
import { Video } from 'expo-av'
import Constants from 'expo-constants'
import styled, { css } from 'styled-components/native'

import i18n from '@/translations/loader'
import { watchPosition } from '@/services/LocationService'

import WeatherNow from '@/components/WeatherNow/index'
import { WeatherStoreImpl } from '@/stores/WeatherStore'
import { WeatherUnitEnum } from '@/services/OpenWeatherService'

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
  justify-content: flex-start;

  ${props => props.backgroundColor && css`
    background-color: ${props.backgroundColor};
  `}
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
  padding-top: ${Constants.statusBarHeight + 30}px;
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
  text-align: center
`

interface WeatherPageProps {
  weatherStore: WeatherStoreImpl
}

const WeatherPage: React.FC<WeatherPageProps> = observer(({ weatherStore }) => {
  const [errorMessage, setErrorMessage] = useState<String>()

  useEffect(() => {
    watchPosition(async currentPosition => {
      try {
        await weatherStore.loadFromAPI(currentPosition)
      } catch (err) {
        setErrorMessage(i18n.t('errors.get_openweather_data'))
      }
    }).catch(() => {
      setErrorMessage(i18n.t('errors.get_position'))
    })
  }, [])

  const { now } = weatherStore
  const {
    unit,
    city,
    condition,
    temp,
    min,
    max,
    sunrise,
    sunset,
    theme
  } = now || {}

  return (
    <MainView>
      { !errorMessage
        ? now
          ? <WeatherView>
                <BackgroundVideo
                  source={theme?.background?.video()}
                  isLooping
                  isMuted={true}
                  shouldPlay
                  resizeMode="cover" />
                <WeatherDataView backgroundColor={theme?.background.color}>
                  <DataView>
                    <WeatherNow now={{
                      unit,
                      city,
                      condition,
                      temp,
                      min,
                      max,
                      sunrise,
                      sunset,
                      theme
                    }} />
                  </DataView>
                  <ActionView>
                    <TouchableOpacity onPress={() => now.setMetricUnit(WeatherUnitEnum.CELSIUS)}>
                      <UnitButton>C⁰</UnitButton>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => now.setMetricUnit(WeatherUnitEnum.FAHRENHEIT)}>
                      <UnitButton>F⁰</UnitButton>
                    </TouchableOpacity>
                  </ActionView>
                </WeatherDataView>
              </WeatherView>
          : <ActivityIndicator size="large" color="#0000ff" />
        : <Text>{ errorMessage }</Text>
      }
      <StatusBar style="auto" />
    </MainView>
  )
})

export default WeatherPage
