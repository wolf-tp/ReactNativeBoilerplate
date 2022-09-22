import { useCallback, useEffect, useLayoutEffect } from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import Animated, {
  AnimatedStyleProp,
  Easing,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';

import { sharedBin } from './math';

import { onCheckType } from '../method';

type AnimatedValue = boolean | number;

/**
 * Return value runs from 0 to 1 when state change using withTiming
 */
export const useSharedTransition = (
  state: boolean | number,
  config?: WithTimingConfig,
): Animated.SharedValue<number> => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);
  return useDerivedValue(() =>
    withTiming(
      value.value,
      Object.assign(
        { duration: 500, easing: Easing.bezier(0.33, 0.01, 0, 1) },
        config,
      ),
    ),
  );
};

type ShareAnimatedParams = {
  state?: AnimatedValue;
  /**
   * Using `'worklet';` in the top of function
   */
  withStyle: (
    value: SharedValue<number>,
  ) => AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>;

  delay?: number;

  config?: WithTimingConfig;
  initState?: AnimatedValue;
};
export const useSharedAnimated = ({
  state,
  config,
  initState,
  withStyle,
  delay,
}: ShareAnimatedParams): [
  ReturnType<ShareAnimatedParams['withStyle']>,
  /** Set animation value */
  (callback: (state: AnimatedValue) => AnimatedValue) => void,
] => {
  const value = useSharedValue(Number(initState || 0));

  const setAnimationValue = useCallback(
    (params: ((state: AnimatedValue) => AnimatedValue) | AnimatedValue) => {
      const _config: WithTimingConfig = Object.assign(
        { duration: 500, easing: Easing.ease },
        config,
      );
      const _value = Number(
        onCheckType(params, 'function') ? params(value.value) : params || 0,
      );

      const timingAnimated = withTiming(_value, _config);

      value.value = delay ? withDelay(delay, timingAnimated) : timingAnimated;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  );

  useLayoutEffect(() => {
    setAnimationValue(state || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return [useAnimatedStyle(() => withStyle(value), [value]), setAnimationValue];
};

/**
 * Return value runs from 0 to 1 when state change using withSpring
 */
export const useSharedSpringTransition = (
  state: boolean,
  config?: WithSpringConfig,
): Animated.SharedValue<number> => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);
  return useDerivedValue(() => withSpring(value.value, config));
};
