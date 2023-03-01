import React from 'react';
import { ViewProps } from 'react-native';

import { dimension, memo, styled } from '@common';

export type SeparateProps = ViewProps;

export const Separate = memo(({ style }: SeparateProps) => {
  return <Line style={style} />;
});
const Line = styled.View`
  height: ${dimension.separateHeight}px;
  background-color: rgb(193, 193, 193);
`;
