import React, { useEffect } from 'react';

import { images } from '@assets';
import {
  getCss,
  RowView,
  scaping,
  scapingPX,
  screenHeight,
  screenWidth,
  styled,
} from '@common';
import {
  BodyText,
  ButtonScale,
  Checkbox,
  Image,
  Separate,
  TextInput,
  View,
  ViewAnimation,
} from '@components';
import i18n from '@i18n';

export const LoginScreen = () => {
  useEffect(() => {
    i18n.changeLanguage('vi');
  }, []);
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
          top: -screenWidth * 0.4,
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
              width: screenWidth * 0.4,
              aspectRatio: 1.1,
            }}
            source="logo"
          />
        </ContainerImage>

        <ViewAnimation>
          <TextInput typeInput="outline" placeholder="Username" />
          <TextInput typeInput="outline" placeholder="Password" />
          <Checkbox tx={'login.rememberPassword'} />

          <BodyText
            style={{
              textAlign: 'center',
              marginBottom: scaping.small,
              textDecorationLine: 'underline',
            }}>
            Forgot password?
          </BodyText>

          <ButtonScale title="Login" />

          <RowView>
            <SeparateComponent />
            <BodyText style={{ marginHorizontal: scaping.small }}>or</BodyText>
            <SeparateComponent />
          </RowView>
          <ButtonScale title="Sign Up" bgColor="info" />
        </ViewAnimation>
      </ContainerContent>
    </View>
  );
};
const BG_IMG_WIDTH_PERCENT = screenWidth * 0.15;
const IMAGE_WIDTH = screenWidth + BG_IMG_WIDTH_PERCENT * 2;
const IMAGE_RATIO = 1.2;
const BOTTOM_BORDER = screenHeight * 0.2;

const ContainerContent = styled.View`
  ${getCss('containerPadding', 'absolute')}
  bottom:${scaping.massive}px;
  width: 100%;
`;
const ContainerImage = styled(View)`
  ${getCss('centerItem')}
`;
const SeparateComponent = styled(Separate)`
  margin-vertical: ${scapingPX.small};
  flex: 1;
`;
