import React from 'react'
import styled from 'styled-components/native'

const MainView = styled.View``

const CommonText = styled.Text``

const WeatherDaily = () => {
  return (
    <MainView>
        <CommonText>Rio de Janeiro</CommonText>
        <CommonText>Partly Cloudy</CommonText>
        <CommonText>23⁰</CommonText>
        <CommonText>H:24⁰ L:18⁰</CommonText>
    </MainView>
  )
}
