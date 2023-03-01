import React, { useCallback, useMemo } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { sharedTiming } from '@animated';
import {
  css,
  dimensionPx,
  getObjectStyle,
  maybe,
  memo,
  onCheckType,
  PropsStyle,
  scapingPX,
  styled,
  useStyleProps,
  withSharedElement,
} from '@common';

import { HeaderText } from '../text';

export interface ButtonProps extends TouchableOpacityProps, PropsStyle {
  children?: React.ReactNode | Iterable<React.ReactNode>;
  title?: string;
  type?: 'primary' | 'outline' | 'clean';
  outlineColor?: string;
  activeOpacity?: number;
  sharedElementId?: string;
}

export const Button = memo(
  ({
    children,
    title,
    type = 'primary',
    activeOpacity = 0.6,
    sharedElementId,
    ...otherProps
  }: ButtonProps) => {
    const displayContent = useMemo(() => title || children, [title, children]);

    const style = useStyleProps(otherProps);

    const content = useMemo(
      () =>
        onCheckType(displayContent, 'string') ? (
          <ButtonTextColor bold color={maybe(otherProps?.outlineColor)}>
            {displayContent}
          </ButtonTextColor>
        ) : (
          displayContent
        ),
      [displayContent, otherProps?.outlineColor],
    );

    const buttonStyle = useCallback(
      ({ pressed }: PressableStateCallbackType) => {
        return getObjectStyle([
          style,
          { opacity: pressed ? activeOpacity : 1 },
        ]);
      },
      [activeOpacity, style],
    );

    return withSharedElement(
      <Container type={type} style={buttonStyle} {...otherProps}>
        {content}
      </Container>,
      { id: sharedElementId },
    );
  },
);

export interface ButtonScaleProps extends ButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
}
export const ButtonScale = ({
  onPressIn,
  onPressOut,
  containerStyle,
  ...otherProps
}: ButtonScaleProps) => {
  const animation = useSharedValue(1);

  const animationScale = useCallback(
    (inScale?: boolean) => (animation.value = sharedTiming(inScale ? 0.9 : 1)),
    [animation],
  );

  const _onPressIn = useCallback(
    (e: GestureResponderEvent) => {
      animationScale(true);
      onPressIn?.(e);
    },
    [animationScale, onPressIn],
  );

  const _onPressOut = useCallback(
    (e: GestureResponderEvent) => {
      animationScale();
      onPressOut?.(e);
    },
    [animationScale, onPressOut],
  );

  const animationStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: animation.value }],
    }),
    [animation.value],
  );

  return (
    <Animated.View style={[animationStyle, containerStyle]}>
      <Button
        activeOpacity={1}
        onPressIn={_onPressIn}
        onPressOut={_onPressOut}
        {...otherProps}
      />
    </Animated.View>
  );
};

/**
 * Style & Component
 */
const presentStyleCss = css<ButtonProps & PressableProps>`
  ${({ type, outlineColor }) => {
    switch (type) {
      case 'outline':
        return css`
          border-color: ${({ theme }) => outlineColor || theme.primary};
          background-color: transparent;
          border-width: ${dimensionPx.borderWidth};
        `;

      case 'clean':
        return css`
          background-color: transparent;
          align-items: flex-start;
          padding: 0;
          margin: 0;
        `;

      default:
        return css``;
    }
  }}
`;

const Container = styled(Pressable)<ButtonProps>`
  background-color: ${({ theme }) => theme.primary};
  border-radius: ${dimensionPx.borderRadius};
  padding-vertical: ${scapingPX.small};
  padding-horizontal: ${scapingPX.small};
  align-items: center;
  ${presentStyleCss}
`;
const ButtonTextColor = styled(HeaderText)`
  color: ${({ theme }) => theme.buttonText};
`;
