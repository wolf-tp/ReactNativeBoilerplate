import { useMemo } from 'react';
import { ViewProps } from 'react-native';

import {
  DistanceStyleProps,
  getObjectStyle,
  getStyleByProperty,
} from '../styles/handle';

export const useStyleProps = (
  props: DistanceStyleProps & { style?: ViewProps['style'] },
) => {
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
  } = props;

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
    ],
  );

  const componentStyle = useMemo(
    () => getObjectStyle([propsStyle, getObjectStyle(style)]),
    [style, propsStyle],
  );

  return componentStyle;
};
