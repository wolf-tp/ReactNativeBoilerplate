import React from 'react';

import { LoadingDialog } from '@components';
import { NavigationContainer } from '@react-navigation/native';

import AuthorizedScreens from './authorized-navigation';

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <AuthorizedScreens />

      <LoadingDialog />
    </NavigationContainer>
  );
};
