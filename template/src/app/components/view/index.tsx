import React from 'react';
import { View as ViewRN, ViewProps as ViewRNProps } from 'react-native';

import { memo, PropsStyle, useStyleProps } from '@common';

export interface ViewProps extends PropsStyle, ViewRNProps {}

export const View = memo((props: ViewProps) => {
  const style = useStyleProps(props);

  return <ViewRN {...props} style={style} />;
});
