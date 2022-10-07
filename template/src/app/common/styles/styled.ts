import * as styledComponents from 'styled-components/native';

import { myTheme } from './theme';

export type StyledTheme =
  styledComponents.ReactNativeThemedStyledComponentsModule<typeof myTheme>;

const {
  default: styled,
  css,
  ThemeProvider,
  useTheme,
} = styledComponents as unknown as StyledTheme;

export { css, ThemeProvider as StyledProvider, useTheme, styled };
