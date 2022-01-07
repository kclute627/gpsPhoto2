import React, { FunctionComponent } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home/Home';
import { StackTypes } from '../types/types';
import Camera from '../Screens/Photo/Camera';
import Settings from '../Screens/Settings/Settings';


const Stack = createNativeStackNavigator<StackTypes>()

const StackNav: FunctionComponent = () => {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
}

export default StackNav
