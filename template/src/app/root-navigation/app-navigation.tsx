import React from 'react';

import { LoadingDialog } from '@components';
import { NavigationContainer } from '@react-navigation/native';

// import AuthorizedScreens from './authorized-navigation';
// import AuthorizedScreens from './authorized-navigation';
import UnAuthorScreens from './unauthorize-navigation';

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <UnAuthorScreens />

      <LoadingDialog />
    </NavigationContainer>
  );
};
