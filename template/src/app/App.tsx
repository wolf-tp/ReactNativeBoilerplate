import React, { useEffect } from 'react';
import { UIManager } from 'react-native';

import { I18nextProvider } from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { AppModule, isIOS, RXStore, ThemeProvider } from '@common';
import { store } from '@store/store';

import i18n from './i18n';
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
  enableAutoToolbar: true,
  overrideKeyboardAppearance: true,
  keyboardAppearance: 'default',
  shouldResignOnTouchOutside: true,
  shouldPlayInputClicks: true,
  resignFirstResponder: true,
  reloadLayoutIfNeeded: true,
  toolbarPreviousNextButtonEnable: true,
  toolbarDoneBarButtonItemText: '',
});

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider>
              <AppContainer />
              <RXStore />
            </ThemeProvider>
          </I18nextProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
