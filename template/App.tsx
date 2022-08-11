import React, { useEffect, type PropsWithChildren } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ENVConfig } from "./src/app/config";
import RNBootSplash from "react-native-bootsplash";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { AppContainer } from "./src/app/root-navigation";
import { store } from "./src/app/redux/store/store";

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
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
