import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import MyContacts from './screens/MyContacts'
import CreatingContact from './screens/CreatingContact'
import Profile from './screens/Profile'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MyContacts'>
        <Stack.Screen name='MyContacts' component={MyContacts} />
        <Stack.Screen name='CreatingContact' component={CreatingContact} />
        <Stack.Screen name='Profile' component={Profile} 
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}