import React, { useMemo } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
} from 'react-native-reanimated';

import { memo } from '@common';

export interface ViewAnimationProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  notInOut?: boolean;
  inDelay?: number;
}

const TransactionLayout = CurvedTransition.delay(100);

export const ViewAnimation = memo(
  ({
    children,
    style,
    notInOut,
    inDelay = 100,
    ...otherProps
  }: ViewAnimationProps & Animated.AnimateProps<ViewProps>) => {
    const inOutProps = useMemo(
      () =>
        !notInOut && {
          entering: FadeInUp.delay(inDelay),
          exiting: FadeOutUp.duration(100),
        },
      [inDelay, notInOut],
    );

    return (
      <Animated.View
        layout={TransactionLayout}
        style={style}
        {...otherProps}
        {...inOutProps}>
        {children}
      </Animated.View>
    );
  },
);
