import { Platform } from 'react-native';

import { css } from './styled';

import { scapingPX } from '../scale/index';

export const CSS = {
  row: css`
    flex-direction: row;
    align-items: center;
  `,
  centerItem: css`
    align-items: center;
  `,
  centerContent: css`
    justify-content: center;
  `,
  betweenContent: css`
    justify-content: space-between;
  `,
  shadow: css`
    ${Platform.select({
      ios: css`
        elevation: 1.5;
      `,
      android: css`
        shadow-color: #f1f4f9;
        border-width: 0.2px;
        shadow-radius: 12px;
        shadow-offset: 0px 4px;
        shadow-opacity: 0.2;
      `,
    })}
    margin-bottom: ${scapingPX.smaller};
  `,
  container: css<{ notPadding?: boolean }>`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    ${({ notPadding }) => (!notPadding ? scapingPX.medium : '')}
  `,
  containerPadding: css`
    padding-horizontal: ${scapingPX.medium};
  `,
  paddingH: css`
    padding-horizontal: ${scapingPX.medium};
  `,
  absolute: css`
    position: absolute;
  `,
  fullFlex: css`
    flex: 1;
  `,
};
export type CssKey = keyof typeof CSS;
