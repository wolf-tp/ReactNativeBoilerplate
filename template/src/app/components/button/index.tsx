import React, { useMemo } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { dimension, onCheckType, scaping, styled } from '@common';

export interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode | Iterable<React.ReactNode>;
  title?: string;
}

export const Button = ({ children, title, ...otherProps }: ButtonProps) => {
  const displayContent = useMemo(() => title || children, [title, children]);

  return (
    <Container {...otherProps}>
      {onCheckType(displayContent, 'string') ? (
        <Text>{displayContent}</Text>
      ) : (
        displayContent
      )}
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.primary};
  padding: ${scaping.smaller}px;
  border-radius: ${dimension.borderRadius}px;
`;
