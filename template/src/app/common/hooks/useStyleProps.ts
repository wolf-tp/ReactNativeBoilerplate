import { useMemo } from 'react';
import { ViewProps, ViewStyle } from 'react-native';

import { maybe, removeUndefinedField } from '../method';
import {
  DistanceStyleProps,
  getObjectStyle,
  getStyleByProperty,
  OtherStyle,
} from '../styles/handle';
import { useTheme } from '../styles/styled';

export type StyleProps = DistanceStyleProps &
  OtherStyle & {
    style?: ViewProps['style'];
  };

export const useStyleProps = (props: StyleProps) => {
  const {
    mgBottom,
    mgHorizontal,
    mgLeft,
    mgRight,
    mgTop,
    mgVertical,
    pdBottom,
    pdHorizontal,
    pdLeft,
    pdRight,
    pdTop,
    pdVertical,
    style,
    top,
    left,
    right,
    bottom,
    /**
     * Other props
     * Custom props
     */
    bgColor,
    fullFlex,
    hide,
    row,
    absolute,
    between,
    // Style props
    alignContent,
    alignItems,
    alignSelf,
    zIndex,
  } = props;

  const theme = useTheme();

  const propsStyle = useMemo(
    () => getStyleByProperty(props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      mgBottom,
      mgHorizontal,
      mgLeft,
      mgRight,
      mgTop,
      mgVertical,
      pdBottom,
      pdHorizontal,
      pdLeft,
      pdRight,
      pdTop,
      pdVertical,
      top,
      left,
      right,
      bottom,
    ],
  );

  const customStyle = useMemo<ViewStyle>(
    () =>
      removeUndefinedField({
        backgroundColor: maybe(bgColor && theme[bgColor]),
        flex: maybe(fullFlex && 1),
        display: maybe(hide && 'none'),
        flexDirection: maybe(row && 'row'),
        alignItems: maybe(row && 'center'),
        position: maybe(absolute && 'absolute'),
        justifyContent: maybe(between && 'space-between'),
      }),
    [bgColor, theme, fullFlex, hide, row, absolute, between],
  );

  const otherStyle = useMemo(
    () => removeUndefinedField({ alignContent, alignItems, alignSelf, zIndex }),
    [alignContent, alignItems, alignSelf, zIndex],
  );

  const componentStyle = useMemo(
    () =>
      getObjectStyle([
        propsStyle,
        customStyle,
        otherStyle,
        getObjectStyle(style),
      ]),
    [propsStyle, style, customStyle, otherStyle],
  );

  return componentStyle;
};
