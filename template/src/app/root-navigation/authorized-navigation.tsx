import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as screens from '@features';

import { Stack } from './screen-list';

const AuthorizedScreens = () => {
  return (
    <Stack.Navigator>
      {/* ===== Defined AuthorizedStack ===== */}
      <Stack.Screen name="Home" component={screens.HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthorizedScreens;
