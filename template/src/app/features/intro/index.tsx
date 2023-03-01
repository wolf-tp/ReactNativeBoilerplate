import React from 'react';

import { images } from '@assets';
import { getCss, scapingPX, screenHeight, screenWidth, styled } from '@common';
import { BodyText, ButtonScale, Image, View } from '@components';
import { useNavigation } from '@react-navigation/native';

export const IntroScreen = () => {
  const { navigate } = useNavigation();
  return (
    <View fullFlex>
      <Image
        sharedElementId="top_background"
        source={images.background}
        style={{
          position: 'absolute',
          width: IMAGE_WIDTH,
          left: -BG_IMG_WIDTH_PERCENT,
          aspectRatio: IMAGE_RATIO,
          top: -screenWidth * 0.25,
        }}
        imageStyle={{
          borderRadius: BOTTOM_BORDER,
        }}
        resizeMode={'stretch'}
      />

      <ContainerContent>
        <ContainerImage>
          <Image
            sharedElementId="item_logo"
            style={{
              width: screenWidth * 0.5,
              aspectRatio: 1.1,
            }}
            source="logo"
          />
        </ContainerImage>

        <DescriptionText>
          Let's build a healthy community together
        </DescriptionText>
        <ButtonScale
          title="Get Started"
          onPress={() =>
            navigate('Login', {
              pictureID: images.logo,
            })
          }
        />
      </ContainerContent>
    </View>
  );
};
const BG_IMG_WIDTH_PERCENT = screenWidth * 0.15;
const IMAGE_WIDTH = screenWidth + BG_IMG_WIDTH_PERCENT * 2;
const IMAGE_RATIO = 1.2;
const BOTTOM_BORDER = screenHeight * 0.2;

const DescriptionText = styled(BodyText)`
  margin-bottom: ${screenHeight * 0.23}px;
  text-align: center;
  font-weight: 200;
`;
const ContainerContent = styled.View`
  ${getCss('containerPadding', 'absolute')}
  bottom:${scapingPX.medium};
  width: 100%;
`;
const ContainerImage = styled(View)`
  ${getCss('centerItem')}
  margin-bottom: ${scapingPX.medium};
`;
