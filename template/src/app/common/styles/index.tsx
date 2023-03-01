import React from 'react';
export * from './theme';
export * from './handle';
export * from './typography';
export * from './constants';
export * from './global-styles';

import { useSelector } from '@hooks';

import { StyledProvider } from './styled';
import { myTheme } from './theme';

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useSelector(store => store.app.theme);
  return <StyledProvider theme={theme || myTheme}>{children}</StyledProvider>;
};
