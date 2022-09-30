import React from 'react';

import * as screens from '@features';

import { Stack } from './screen-list';

const AuthorizedScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* ===== Defined AuthorizedStack ===== */}
      <Stack.Screen name="Home" component={screens.HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthorizedScreens;
