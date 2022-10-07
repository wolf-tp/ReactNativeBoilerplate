import React, { useMemo } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  capitalizeFirstLetter,
  mb,
  memo,
  StyleProps,
  useStyleProps,
} from '@common';

type SafeType = 'bottom' | 'left' | 'right' | 'top';
type SafeScaping = 'padding' | 'margin';
export interface ScreenProps
  extends Omit<StyleProps, 'horizontal'>,
    ScrollViewProps {
  hiddenStatusBar?: boolean;
  barStyle?: StatusBarStyle;

  /**Using safe in ios*/
  unSafe?: boolean;
  safes?: SafeType[];
  type?: SafeScaping;
}

const getSafeScaping =
  (type: SafeScaping, safeList?: SafeType[], propsStyle?: any) =>
  (safeType: SafeType, safeValue: number) =>
    safeList?.includes(safeType) &&
    ({
      [type + capitalizeFirstLetter(safeType)]:
        mb(safeValue, 0) +
        mb(propsStyle?.[type + capitalizeFirstLetter(safeType)] as number, 0),
    } as ViewStyle);

export const Screen = memo(
  ({
    hiddenStatusBar,
    barStyle,
    type = 'padding',
    safes = ['bottom', 'left', 'right', 'top'],
    unSafe,
    ...props
  }: ScreenProps) => {
    const { bottom, top } = useSafeAreaInsets();
    const propsStyles = useStyleProps(props as StyleProps);

    const getSafe = useMemo(
      () => getSafeScaping(type, safes, propsStyles),
      [safes, type, propsStyles],
    );

    const safeStyleWithStyle = useMemo<ViewStyle>(() => {
      const safeStyle = {
        ...getSafe('top', top),
        ...getSafe('bottom', bottom),
      };

      return StyleSheet.flatten([propsStyles, !unSafe && safeStyle]);
    }, [bottom, getSafe, propsStyles, top, unSafe]);

    return (
      <>
        <StatusBar
          hidden={hiddenStatusBar}
          backgroundColor={'transparent'}
          translucent
          barStyle={barStyle || 'light-content'}
        />
        <ScrollView {...props} style={safeStyleWithStyle} />
      </>
    );
  },
);
