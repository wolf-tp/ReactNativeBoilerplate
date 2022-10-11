import React from 'react';

import * as screens from '@features';
import { createStackNavigator } from '@react-navigation/stack';

import { AppScreensParams } from './screen-list';

export const Stack = createStackNavigator<AppScreensParams>();

const AuthorizedScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* ===== Defined AuthorizedStack ===== */}
      <Stack.Screen name="Home" component={screens.HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthorizedScreens;
