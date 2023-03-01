import React from 'react';

import { SharedElement } from 'react-navigation-shared-element';

import { SharedElementProps } from 'react-navigation-shared-element/build/SharedElement';

export const withSharedElement = <T extends React.ReactNode>(
  Node: T,
  props: Partial<SharedElementProps> = {},
) => {
  if (props?.id)
    return (
      <SharedElement {...(props as SharedElementProps)}>{Node}</SharedElement>
    );
  return Node;
};
