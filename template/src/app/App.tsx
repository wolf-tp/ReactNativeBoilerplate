import React, { useEffect } from 'react';
import { UIManager } from 'react-native';

import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { AppModule, isIOS, RXStore, ThemeProvider } from '@common';
import { store } from '@store/store';

import { AppContainer } from './root-navigation/app-navigation';

if (!isIOS) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

AppModule.setIQKeyboardOption({
  enable: true,
  layoutIfNeededOnUpdate: true,
  enableDebugging: false,
  enableAutoToolbar: false,
  overrideKeyboardAppearance: true,
  keyboardAppearance: 'default',
  shouldResignOnTouchOutside: true,
  shouldPlayInputClicks: true,
  resignFirstResponder: true,
  reloadLayoutIfNeeded: true,
});

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
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
