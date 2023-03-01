import React from 'react';

import { LoadingDialog } from '@components';
import { NavigationContainer } from '@react-navigation/native';

// import BottomNavigation from './bottom-navigation';
import UnAuthorScreens from './unauthorize-navigation';

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <UnAuthorScreens />

      <LoadingDialog />
    </NavigationContainer>
  );
};
