import React, { useEffect } from 'react';

import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { RXStore } from './src/app/common';
import { store } from './src/app/redux/store/store';
import { AppContainer } from './src/app/root-navigation';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppContainer />
        </GestureHandlerRootView>
        <RXStore />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
