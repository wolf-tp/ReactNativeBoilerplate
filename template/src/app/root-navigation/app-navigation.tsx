import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Stack = createStackNavigator();
export const AppContainer = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator></Stack.Navigator> */}
    </NavigationContainer>
  );
};
