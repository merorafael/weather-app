import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import i18n from '@/translations/loader'
import { WeatherInterface } from '@/services/OpenWeatherService'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const MainView = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SunsetRow = styled.View`
  flex-direction: row;
  padding-vertical: 10px;
  justify-content: space-around;
`

const SunsetView = styled.View`
  padding-horizontal: 20px;
  flex-direction: row;
  align-items: center;
`

const WeatherDisplay = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Icon = styled(MaterialCommunityIcons)`
  text-shadow-color: #444;
  text-shadow-offset: 1px 2px;
  text-shadow-radius: 4px;
  color: #FFF;
`

const WeatherIcon = styled(Icon)`
  font-size: 90px;
`

const Text = styled.Text`
  text-shadow-color: #444;
  text-shadow-offset: 1px 2px;
  text-shadow-radius: 4px;
  color: #fff;
`

const ConditionText = styled(Text)`
`

const WeatherRangeText = styled(Text)`
`

const SunsetText = styled(Text)`
`

const CityText = styled(Text)`
  font-size: 25px;
`

const WeatherText = styled(Text)`
  font-size: 60px;
`

interface WeatherNowProps {
  now: WeatherInterface;
}

const WeatherNow: React.FC<WeatherNowProps> = ({ now }) => {
  return (
    <MainView>
        <CityText>{now.city}</CityText>
        <ConditionText>{i18n.t(`conditions.${now.condition?.toLowerCase()}`)}</ConditionText>
        <WeatherDisplay>
          <WeatherIcon size={100} name={now.theme?.icon} />
          <WeatherText>{now.temp}⁰</WeatherText>
        </WeatherDisplay>
        <WeatherRangeText>
          {i18n.t('temp.current_range', {
            min: now.min,
            max: now.max
          })}
        </WeatherRangeText>
        <SunsetRow>
          <SunsetView>
            <Icon size={25} name="weather-sunset-up" />
            <SunsetText>{now?.sunrise?.format('HH:MM')}</SunsetText>
          </SunsetView>
          <SunsetView>
            <Icon size={25} name="weather-sunset-down" />
            <SunsetText>{now?.sunset?.format('HH:MM')}</SunsetText>
          </SunsetView>
        </SunsetRow>
    </MainView>
  )
}

WeatherNow.propTypes = {
  now: PropTypes.object
}

export default WeatherNow
