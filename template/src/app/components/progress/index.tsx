import React from 'react';

import { memo } from '@common';

import { ProgressCircle, ProgressLinear } from './components';
import { ProgressProps } from './types';

export const Progress = memo((props: ProgressProps) => {
  // state
  const { type = 'linear' } = props;

  // style
  return type === 'linear' ? (
    <ProgressLinear {...props} />
  ) : (
    <ProgressCircle {...props} />
  );
});
