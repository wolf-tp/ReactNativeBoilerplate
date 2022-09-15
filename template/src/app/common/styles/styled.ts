import * as styledComponents from 'styled-components/native';

import { myTheme } from './theme';

const {
  default: styled,
  css,
  ThemeProvider,
  useTheme,
} = styledComponents as unknown as styledComponents.ReactNativeThemedStyledComponentsModule<
  typeof myTheme
>;

export { css, ThemeProvider as StyledProvider, useTheme, styled };
