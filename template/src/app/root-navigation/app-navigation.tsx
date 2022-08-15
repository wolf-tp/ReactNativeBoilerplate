import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthorizedScreens from './authorized-navigation';
import { AppScreensParams, Stack } from './screen-list';

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <AuthorizedScreens />
    </NavigationContainer>
  );
};
