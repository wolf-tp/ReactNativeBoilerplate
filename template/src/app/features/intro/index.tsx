import React from 'react';
import { StyleSheet } from 'react-native';

import { ImageSvg } from '@assets/svg';
import { windowHeight, windowWidth } from '@common';
import { BodyText, ButtonScale, Screen, View } from '@components';

export const IntroScreen = () => {
  return (
    <View fullFlex>
      <ImageSvg
        name="UnAuthBg"
        style={StyleSheet.absoluteFillObject}
        width={windowWidth}
        height={windowHeight}
      />
      <Screen fullFlex></Screen>
      <View
        absolute
        bottom="medium"
        row
        between
        right="none"
        left="none"
        alignItems="flex-end"
        pdHorizontal="medium"
        pdBottom="medium">
        <View row>
          <BodyText color="white">New Here? </BodyText>
          <ButtonScale type="clean">
            <BodyText color="white" bold>
              Register
            </BodyText>
          </ButtonScale>
        </View>
        <ButtonScale
          pdHorizontal="mediumPlus"
          title="Login"
          type="outline"
          outlineColor="white"
        />
      </View>
    </View>
  );
};
