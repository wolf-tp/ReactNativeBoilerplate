import React, { forwardRef, LegacyRef, useMemo } from 'react';
import { TextInput as TextRNInput } from 'react-native';

import { memo } from '@common';

import { InputFlat } from './components/flat';
import { InputOutline } from './components/outline';
import type { TextFieldProps } from './type';

export type TextInputProps = TextFieldProps;

export const TextInput = memo(
  forwardRef<LegacyRef<TextRNInput>, TextInputProps>(
    ({ typeInput = 'flat', ...props }, ref) => {
      const InputComponent = useMemo(
        () => (typeInput === 'outline' ? InputOutline : InputFlat),
        [typeInput],
      );

      return <InputComponent {...props} ref={ref} />;
    },
  ),
);
