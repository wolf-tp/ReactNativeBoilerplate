import React from 'react';
import { Text, View as ViewRN } from 'react-native';

export type ViewProps = {
  data: any;
};

export const View = (props: ViewProps) => {
  return (
    <ViewRN>
      <Text>ViewComponent</Text>
    </ViewRN>
  );
};
