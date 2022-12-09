import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

import { memo, useTheme } from '@common';
import { useDisableBackHandler, useDismissKeyboard } from '@hooks';

import { View } from '../view';

const AnimatedView = Animated.createAnimatedComponent(View);

const Spinner = memo(() => {
  // state
  const theme = useTheme();
  // render
  return <ActivityIndicator color={theme.primary} size={'large'} />;
});

const LoadingDialogComponent = forwardRef<ProgressDialogRef, unknown>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    // effect
    useImperativeHandle(
      ref,
      () => ({
        show: () => setVisible(true),
        hide: () => setVisible(false),
        setLoading: loading => setVisible(!!loading),
      }),
      [],
    );

    useDisableBackHandler(visible);
    useDismissKeyboard(visible);

    return visible ? (
      <AnimatedView
        style={StyleSheet.absoluteFillObject}
        exiting={FadeOutUp}
        bgColor="modalBgColor"
        justifyContent="center"
        alignItems="center">
        <AnimatedView
          entering={FadeInUp}
          bgColor="background"
          borderRadius="small"
          pdHorizontal="medium"
          pdVertical="medium">
          <Spinner />
        </AnimatedView>
      </AnimatedView>
    ) : null;
  },
);
export const progressDialogRef = createRef<ProgressDialogRef>();
export const LoadingDialog = () => (
  <LoadingDialogComponent ref={progressDialogRef} />
);

export const showLoading = () => {
  progressDialogRef.current?.show();
};

export const hideLoading = () => {
  progressDialogRef.current?.hide();
};

export const setLoading: ProgressDialogRef['setLoading'] = loading => {
  progressDialogRef.current?.setLoading(loading);
};
export interface ProgressDialogRef {
  show(): void;
  hide(): void;
  setLoading(value?: boolean): void;
}
