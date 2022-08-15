import React, { useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { onCheckType } from '@common';

export interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode | Iterable<React.ReactNode>;
  title?: string;
}

export const Button = ({ children, title }: ButtonProps) => {
  const displayContent = useMemo(() => title || children, [title, children]);

  return (
    <TouchableOpacity>
      {onCheckType(displayContent, 'string') ? (
        <Text>{displayContent}</Text>
      ) : (
        displayContent
      )}
    </TouchableOpacity>
  );
};
