import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthorizedScreens from './authorized-navigation';

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <AuthorizedScreens />
    </NavigationContainer>
  );
};
