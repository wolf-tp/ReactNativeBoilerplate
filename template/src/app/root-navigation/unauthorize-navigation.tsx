import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import * as screens from '@features';

import { AppScreensParams } from './screen-list';

export const Stack = createSharedElementStackNavigator<AppScreensParams>();

const UnAuthorScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* ===== Defined UnAuthorizeStack ===== */}
      <Stack.Screen name="Intro" component={screens.IntroScreen} />
      <Stack.Screen
        name="Login"
        component={screens.LoginScreen}
        sharedElements={() => ['item_logo', 'top_background']}
      />
    </Stack.Navigator>
  );
};

export default UnAuthorScreens;
