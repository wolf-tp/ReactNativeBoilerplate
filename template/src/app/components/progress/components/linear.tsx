import React, { useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, ViewStyle } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { sharedTiming } from '@animated';

import { COLOR_BG, COLOR_FG, STROKE_WIDTH } from '../constant';
import { ProgressLinearProps } from '../types';

export const ProgressLinear = ({
  progress,
  bg = COLOR_BG,
  fg = COLOR_FG,
  radius = 4,
  strokeWidth = STROKE_WIDTH,
}: ProgressLinearProps) => {
  // state
  const [widthProgress, setWidthProgress] = useState(0);
  const progressAnimated = useSharedValue(0);

  useEffect(() => {
    progressAnimated.value = sharedTiming((progress / 100) * widthProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, widthProgress]);

  // style
  const bgStyle = useMemo<ViewStyle[]>(
    () => [
      styles.bg,
      {
        backgroundColor: bg,
        height: strokeWidth,
        borderRadius: radius,
      },
    ],
    [bg, radius, strokeWidth],
  );
  const fgStyle = useMemo<ViewStyle[]>(
    () => [
      styles.fg,
      {
        backgroundColor: fg,
        borderRadius: radius,
      },
    ],
    [fg, radius],
  );

  // function
  const _onLayoutBg = (e: LayoutChangeEvent) => {
    setWidthProgress(e.nativeEvent.layout.width);
  };

  // reanimated style
  const foregroundStyle = useAnimatedStyle(() => ({
    width: progressAnimated.value,
  }));

  // render
  return (
    <Animated.View onLayout={_onLayoutBg} style={bgStyle}>
      <Animated.View style={[fgStyle, foregroundStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 4,
    backgroundColor: '#dbdbdb',
    marginVertical: 3,
    overflow: 'hidden',
  },
  fg: {
    position: 'absolute',
    backgroundColor: '#0057e7',
    height: '100%',
    width: '100%',
  },
});
