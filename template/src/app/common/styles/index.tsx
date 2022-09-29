import React from 'react';
export * from './theme';
export * from './handle';
export * from './typography';

import { useSelector } from '@hooks';
import { getAppTheme } from '@redux-slice';

import { StyledProvider } from './styled';

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useSelector(getAppTheme);
  return <StyledProvider theme={theme}>{children}</StyledProvider>;
};
