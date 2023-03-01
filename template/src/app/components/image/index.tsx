import React, { useMemo } from 'react';
import {
  Image as ImageRN,
  ImageProps as ImageRNProps,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';

import { images } from '@assets';
import { memo, styled } from '@common';

type ImageRNSourceType = ImageRNProps['source'];

export interface ImageProps extends Omit<ImageRNProps, 'style' | 'source'> {
  imageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  source: ImageRNSourceType | keyof typeof images;
  sharedElementId?: string;
}

export const Image = memo(
  ({ source, style, imageStyle, sharedElementId }: ImageProps) => {
    const imgSource: ImageRNSourceType = useMemo(() => {
      if (typeof source === 'string') {
        return images[source];
      }
      return source;
    }, [source]);

    return (
      <View style={style}>
        {sharedElementId ? (
          <SharedElement id={sharedElementId}>
            <ImageComponent style={imageStyle} source={imgSource} />
          </SharedElement>
        ) : (
          <ImageComponent style={imageStyle} source={imgSource} />
        )}
      </View>
    );
  },
);

const ImageComponent = styled(ImageRN)`
  width: 100%;
  height: 100%;
  resize-mode: stretch;
`;
