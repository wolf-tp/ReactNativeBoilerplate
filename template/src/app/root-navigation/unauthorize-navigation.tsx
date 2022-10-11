import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as screens from '@features';
import { createStackNavigator } from '@react-navigation/stack';

import { AppScreensParams } from './screen-list';


export const Stack = createStackNavigator<AppScreensParams>();

const UnAuthorScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* ===== Defined UnAuthorizeStack ===== */}
      <Stack.Screen name="Intro" component={screens.IntroScreen} />
    </Stack.Navigator>
  );
};

export default UnAuthorScreens;
