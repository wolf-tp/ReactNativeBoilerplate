import React from 'react';
import { ImageBackground } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@assets';
import { getCss, scaping, scapingPX, styled } from '@common';
import {
  BigHeaderText,
  BodyText,
  ButtonScale,
  LabelText,
  Screen,
  TextInput,
  View,
} from '@components';

export const IntroScreen = () => {
  return (
    <ImageBackground
      source={images.background}
      style={{ flex: 1 }}
      resizeMode={'cover'}>
      <Container>
        <Screen>
          <LogoText bold primaryColor>
            Login
          </LogoText>
          <ContainerInput>
            <TextInput typeInput="outline" label="Username" />
            <TextInput typeInput="outline" label="Password" />
            <ForgotButton type="clean">
              <LabelText primaryColor bold>
                Forgot Password?
              </LabelText>
            </ForgotButton>
          </ContainerInput>

          <BottomContainer>
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
          </BottomContainer>
        </Screen>
      </Container>
    </ImageBackground>
  );
};
const LogoText = styled(BigHeaderText)`
  padding-bottom: ${scapingPX.small};
  font-size: ${scapingPX.mediumPlus};
`;
const BottomContainer = styled.View`
  ${getCss('row', 'betweenContent')}
  align-items: flex-end;
`;
const Container = styled(SafeAreaView)`
  ${getCss('containerPadding', 'absolute')}
  bottom:${scapingPX.smaller};
  width: 100%;
`;
const ContainerInput = styled.View`
  margin-bottom: ${scaping.huge * 2.5}px;
`;
const ForgotButton = styled(ButtonScale)`
  align-self: flex-end;
`;
