import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as screens from '@features';

import { Stack } from './screen-list';

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
