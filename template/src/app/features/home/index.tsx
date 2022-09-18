import React from 'react';

import { BodyText, ButtonScale, Progress, View } from '@components';

export const HomeScreen = () => {
  return (
    <View>
      <ButtonScale mgBottom="medium" title="Press me" />
      <BodyText>
        0886137017 https://google.com Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Quisque imperdiet placerat justo, at gravida enim
        rutrum et. Donec vel lacus tempus tortor scelerisque ullamcorper ut eu
        sem. Curabitur nisl ligula, tristique nec consectetur sed, tempus at
        sapien. Phasellus at eros tempor, imperdiet mi sit amet, gravida justo.
        Nullam vel nisl nunc. Donec enim erat, facilisis sed vestibulum in,
        sollicitudin a eros. Vestibulum convallis consectetur lobortis.
        Phasellus fermentum placerat magna et mattis. Suspendisse ornare lorem a
        eros viverra luctus at congue sem. In at nisl pellentesque, accumsan
        nibh eleifend, egestas nibh. Donec venenatis ornare interdum. Curabitur
        pharetra eros vitae egestas dignissim. Donec aliquet odio eu libero
        commodo, eu aliquam odio pulvinar. Maecenas congue nec velit nec
        maximus. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae;
      </BodyText>
      <Progress type="linear" progress={90} />
    </View>
  );
};
