import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import WeatherPage from './pages/WeatherPage/index'
import { WeatherStore } from './stores/WeatherStore'

const Stack = createStackNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Weather">
              {props => <WeatherPage {...props} weatherStore={WeatherStore} />}
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
