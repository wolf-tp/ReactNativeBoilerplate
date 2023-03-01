import { css, styled } from './styled';

export const rowCss = css`
  flex-direction: row;
  align-items: center;
`;

export const RowView = styled.View`
  ${rowCss}
`;
export const RowTouch = styled.TouchableOpacity`
  ${rowCss}
`;
