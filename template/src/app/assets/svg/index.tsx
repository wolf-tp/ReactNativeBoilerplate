import React, { useMemo } from 'react';

import { SvgProps } from 'react-native-svg';

import { memo, PropsStyle, useStyleProps } from '@common';
import { ViewProps } from '@components';

import * as SvgComponent from './svg-component';

export type SvgName = keyof typeof SvgComponent;

export interface ImageSvgProps
  extends SvgProps,
    Omit<
      PropsStyle,
      | 'opacity'
      | 'scaleY'
      | 'scaleX'
      | 'transform'
      | 'rotation'
      | 'translateX'
      | 'translateY'
    > {
  name: SvgName;
}

export const ImageSvg = memo(({ name, ...props }: ImageSvgProps) => {
  const SvgImageComponent = useMemo(() => SvgComponent[name], [name]);
  const styles = useStyleProps(props as ViewProps);

  if (!SvgImageComponent) return null;

  return <SvgImageComponent {...props} style={styles} />;
});
