import React, { useEffect } from 'react';

import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { RXStore, ThemeProvider } from './common';
import { store } from './redux/store/store';
import { AppContainer } from './root-navigation';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppContainer />
          </GestureHandlerRootView>
          <RXStore />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
