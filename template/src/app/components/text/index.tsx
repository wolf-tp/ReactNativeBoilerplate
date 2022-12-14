import React, { forwardRef, Ref } from 'react';
import { Text as RNText, TextProps as TextRNProps } from 'react-native';

import {
  css,
  FontDefault,
  fontSize,
  memo,
  PropsStyle,
  styled,
  useStyleProps,
} from '@common';

type TextProps = {
  bold?: boolean;
  primaryColor?: boolean;
  color?: string;
};

interface ComponentTextProps extends TextProps, TextRNProps, PropsStyle {}

export const Text = memo(
  forwardRef((props: ComponentTextProps, ref: Ref<RNText>) => {
    const style = useStyleProps(props);

    return <RNText {...props} style={style} ref={ref} />;
  }),
);

const TextStyled = styled(Text);

const commonCss = css<TextProps>`
  color: ${({ theme, primaryColor, color }) =>
    color || (primaryColor ? theme.primary : theme.textColor)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-family: ${FontDefault.primary};
`;

export const BodyText = TextStyled`
  font-size: ${fontSize?.bodyTextSize}px;
  ${commonCss}
`;
export const LabelText = TextStyled`
  font-size: ${fontSize?.labelTextSize}px;
  ${commonCss}
`;
export const HeaderText = TextStyled`
  font-size: ${fontSize?.headerTextSize}px;
  ${commonCss}
`;
export const BigHeaderText = TextStyled`
  font-size: ${fontSize?.bigHeaderTextSize}px;
  ${commonCss}
`;
export const SubText = TextStyled`
  font-size: ${fontSize?.miniLabelTextSize}px;
  ${commonCss}
`;
