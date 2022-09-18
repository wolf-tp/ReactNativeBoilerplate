import React, { forwardRef } from 'react';
import { View as ViewRN, ViewProps as ViewRNProps } from 'react-native';

import { memo, PropsStyle, useStyleProps } from '@common';

export interface ViewProps extends PropsStyle, ViewRNProps {}

export const View = memo(
  forwardRef((props: ViewProps, ref: React.LegacyRef<ViewRN>) => {
    const style = useStyleProps(props);

    return <ViewRN ref={ref} {...props} style={style} />;
  }),
);
