import { View, Text } from "react-native";
import React from "react";

export type BaseComponentProps = {};

const Base = (props: BaseComponentProps) => {
  return (
    <View>
      <Text>BaseComponent</Text>
    </View>
  );
};

export default Base;
