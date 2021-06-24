import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import i18n from '../../translations/loader'
import { WeatherInterface } from '../../stores/WeatherStore'

const MainView = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CommonText = styled.Text`
    text-shadow-color: #000;
    text-shadow-offset: 1px 1px;
    text-shadow-radius: 2px;
    color: #FFF;
`

const CityText = styled(CommonText)`
  font-size: 25px;
`

const TempText = styled(CommonText)`
  font-size: 60px;
`

interface WeatherNowProps {
  now: WeatherInterface;
}

const WeatherNow: React.FC<WeatherNowProps> = ({ now }) => {
  return (
    <MainView>
        <CityText>{now.city}</CityText>
        <CommonText>{i18n.t(`conditions.${now.condition?.toLowerCase()}`)}</CommonText>
        <TempText>{now.temp}⁰</TempText>
        <CommonText>{i18n.t('temp.current_range', {
          min: now.min,
          max: now.max
        })}</CommonText>
    </MainView>
  )
}

WeatherNow.propTypes = {
  now: PropTypes.object
}

export default WeatherNow
