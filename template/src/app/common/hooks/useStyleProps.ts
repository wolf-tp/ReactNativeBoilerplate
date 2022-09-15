import { useMemo } from 'react';
import { ViewProps, ViewStyle } from 'react-native';

import { maybe } from '../method';
import {
  DistanceStyleProps,
  getObjectStyle,
  getStyleByProperty,
  OtherStyle,
} from '../styles/handle';
import { useTheme } from '../styles/styled';

type StyleProps = DistanceStyleProps &
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
    () => ({
      backgroundColor: maybe(bgColor && theme[bgColor]),
      flex: maybe(fullFlex && 1),
      display: maybe(hide && 'none'),
      flexDirection: maybe(row && 'row'),
      alignItems: maybe(row && 'center'),
      position: maybe(absolute && 'absolute'),
    }),
    [bgColor, theme, fullFlex, hide, row, absolute],
  );

  const otherStyle = useMemo(
    () => ({ alignContent, alignItems, alignSelf, zIndex }),
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
