import { View, Text } from "react-native";
import React from "react";

type BaseComponentProps = {};

const BaseComponent = (props: BaseComponentProps) => {
  return (
    <View>
      <Text>BaseComponent</Text>
    </View>
  );
};

export default BaseComponent;
