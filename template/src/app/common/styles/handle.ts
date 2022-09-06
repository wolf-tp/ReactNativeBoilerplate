import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { appSize, isArray, isUndefined } from '@common';

type DistanceType = 'mg' | 'pd';
type Direction =
  | 'Left'
  | 'Right'
  | 'Top'
  | 'Bottom'
  | 'Vertical'
  | 'Horizontal';

type DistancePropsKey = `${DistanceType}${Direction}`;
type ScapingSize = keyof typeof appSize;

export type DistanceStyleProps = {
  [key in DistancePropsKey]?: ScapingSize;
};
const KEYS: DistancePropsKey[] = [
  'mgBottom',
  'mgHorizontal',
  'mgLeft',
  'mgRight',
  'mgTop',
  'mgVertical',
  'pdBottom',
  'pdHorizontal',
  'pdLeft',
  'pdRight',
  'pdTop',
  'pdVertical',
];

export const getStyleByProperty = (styleProps: DistanceStyleProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const style: any = {};

  KEYS.forEach(
    key =>
      !isUndefined(styleProps[key]) &&
      (style[key?.replace(/pd/, 'padding')?.replace(/mg/, 'margin')] =
        appSize[styleProps[key] || 'none']),
  );

  return style as ViewStyle;
};

export const getObjectStyle = (style: StyleProp<ViewStyle>) => {
  return isArray(style) ? StyleSheet.flatten(style) : style;
};
