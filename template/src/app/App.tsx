import React, { useEffect } from 'react';
import { UIManager } from 'react-native';

import { I18nextProvider } from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardManager from 'react-native-keyboard-manager';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { isIOS, RXStore, ThemeProvider } from '@common';
import { store } from '@store/store';

import i18n from './i18n';
import { AppContainer } from './root-navigation/app-navigation';

if (!isIOS) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

if (isIOS) {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(false);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  KeyboardManager.setLayoutIfNeededOnUpdate(true);
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setToolbarDoneBarButtonItemText('Done');
  KeyboardManager.setToolbarManageBehaviourBy('subviews'); // "subviews" | "tag" | "position"
  KeyboardManager.setToolbarPreviousNextButtonEnable(false);
  KeyboardManager.setToolbarTintColor('#0000FF'); // Only #000000 format is supported
  KeyboardManager.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
  KeyboardManager.setShouldShowToolbarPlaceholder(true);
  KeyboardManager.setOverrideKeyboardAppearance(false);
  KeyboardManager.setKeyboardAppearance('default'); // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
  KeyboardManager.resignFirstResponder();
}

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
