import React, { forwardRef, LegacyRef } from 'react';
import { TextInput as TextRNInput } from 'react-native';

import { memo } from '@common';

import { InputFlat } from './components/flat';
import type { TextFieldProps } from './type';

export type TextInputProps = TextFieldProps;

export const TextInput = memo(
  forwardRef<LegacyRef<TextRNInput>, TextInputProps>((props, ref) => {
    return <InputFlat {...props} ref={ref} />;
  }),
);
