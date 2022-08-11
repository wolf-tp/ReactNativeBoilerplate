import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Count">
      </Stack.Navigator>
    </NavigationContainer>
  );
};
