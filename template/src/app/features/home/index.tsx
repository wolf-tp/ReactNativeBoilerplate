import React from 'react';
import { ScrollView } from 'react-native';

import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSharedAnimated } from '@animated';
import { BodyText, ButtonScale, Progress, TextInput } from '@components';

export const HomeScreen = () => {
  const [style, setValue] = useSharedAnimated({
    initState: 0,
    config: { duration: 150 },
    withStyle: value => {
      'worklet';
      return { transform: [{ translateX: value.value }] };
    },
  });
  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ButtonScale
          onPress={() => setValue(value => (value === 0 ? 300 : 0))}
          mgBottom="medium"
          title="Press me"
          type="primary"
        />
        <Progress type="linear" progress={90} />
        <Animated.View
          style={[{ width: 50, height: 50, backgroundColor: 'red' }, style]}
        />
        <TextInput
          containerStyle={{ marginTop: 20 }}
          typeInput="flat"
          label="Username"
        />
        <BodyText>
          0886137017 https://google.com Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque imperdiet placerat justo, at gravida enim
          rutrum et. Donec vel lacus tempus tortor scelerisque ullamcorper ut eu
          sem. Curabitur nisl ligula, tristique nec consectetur sed, tempus at
          sapien. Phasellus at eros tempor, imperdiet mi sit amet, gravida
          justo. Nullam vel nisl nunc. Donec enim erat, facilisis sed vestibulum
          in, sollicitudin a eros. Vestibulum convallis consectetur lobortis.
          Phasellus fermentum placerat magna et mattis. Suspendisse ornare lorem
          a eros viverra luctus at congue sem. In at nisl pellentesque, accumsan
          nibh eleifend, egestas nibh. Donec venenatis ornare interdum.
          Curabitur pharetra eros vitae egestas dignissim. Donec aliquet odio eu
          libero commodo, eu aliquam odio pulvinar. Maecenas congue nec velit
          nec maximus. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; 0886137017 https://google.com Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet
          placerat justo, at gravida enim rutrum et. Donec vel lacus tempus
          tortor scelerisque ullamcorper ut eu sem. Curabitur nisl ligula,
          tristique nec consectetur sed, tempus at sapien. Phasellus at eros
          tempor, imperdiet mi sit amet, gravida justo. Nullam vel nisl nunc.
          Donec enim erat, facilisis sed vestibulum in, sollicitudin a eros.
          Vestibulum convallis consectetur lobortis. Phasellus fermentum
          placerat magna et mattis. Suspendisse ornare lorem a eros viverra
          luctus at congue sem. In at nisl pellentesque, accumsan nibh eleifend,
          egestas nibh. Donec venenatis ornare interdum. Curabitur pharetra eros
          vitae egestas dignissim. Donec aliquet odio eu libero commodo, eu
          aliquam odio pulvinar. Maecenas congue nec velit nec maximus.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; 0886137017 https://google.com Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Quisque imperdiet placerat
          justo, at gravida enim rutrum et.
        </BodyText>
      </ScrollView>
    </SafeAreaView>
  );
};
