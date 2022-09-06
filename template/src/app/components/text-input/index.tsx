import React from 'react';
import { Text, TextInputProps as TextInputRNProps, View } from 'react-native';

import { memo } from '@common';

export type TextInputProps = TextInputRNProps;

export const TextInput = memo((props: TextInputProps) => {
  return (
    <View>
      <Text>TextInputComponent</Text>
    </View>
  );
});
