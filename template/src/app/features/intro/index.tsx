import React from 'react';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { images } from '@assets';
import { getCss, scaping, scapingPX, styled } from '@common';
import {
  BigHeaderText,
  BodyText,
  ButtonScale,
  LabelText,
  TextInput,
  View,
} from '@components';

export const IntroScreen = () => {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      accessible={false}>
      <View fullFlex>
        <ImageBackground
          source={images.background}
          style={StyleSheet.absoluteFill}
          resizeMode={'stretch'}
        />
        <ContainerContent>
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
        </ContainerContent>
      </View>
    </TouchableWithoutFeedback>
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
const ContainerContent = styled.View`
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
