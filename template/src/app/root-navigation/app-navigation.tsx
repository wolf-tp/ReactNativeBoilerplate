import React from 'react';

import { LoadingDialog } from '@components';
import { NavigationContainer } from '@react-navigation/native';

import BottomNavigation from './bottom-navigation';

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <BottomNavigation />

      <LoadingDialog />
    </NavigationContainer>
  );
};
