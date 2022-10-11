/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { CSS, CssKey } from './constants';
import { myTheme } from './theme';

import { isArray, isUndefined } from '../method';
import { appSize } from '../scale';

type DistanceType = 'mg' | 'pd';
type Direction =
  | 'Left'
  | 'Right'
  | 'Top'
  | 'Bottom'
  | 'Vertical'
  | 'Horizontal';

type DistancePropsKey =
  | `${DistanceType}${Direction}`
  | Lowercase<Direction>
  | 'borderRadius';

type ScapingSize = keyof typeof appSize;

export type DistanceStyleProps = {
  [key in DistancePropsKey]?: ScapingSize;
};
export type OtherStyle = {
  bgColor?: keyof typeof myTheme;
  fullFlex?: boolean;
  absolute?: boolean;
  hide?: boolean;
  between?: boolean;
  /**using for View */
  row?: boolean;
  /**Using for Text */
} & Omit<
  ViewStyle,
  'flex' | 'flexDirection' | 'backgroundColor' | DistancePropsKey
>;

export type PropsStyle = OtherStyle & DistanceStyleProps;

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
  'top',
  'left',
  'right',
  'bottom',
  'borderRadius',
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
  return isArray(style) ? StyleSheet.flatten(style) : (style as ViewStyle);
};

export const getCss = (...listCss: CssKey[]) => listCss.map(item => CSS[item]);
