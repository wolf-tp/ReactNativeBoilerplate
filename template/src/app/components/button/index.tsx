import React, { useCallback, useMemo } from 'react';
import {
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
  DistanceStyleProps,
  getObjectStyle,
  memo,
  onCheckType,
  scapingPX,
  styled,
  useStyleProps,
} from '@common';
import { HeaderText } from '@components';

export interface ButtonProps extends TouchableOpacityProps, DistanceStyleProps {
  children?: React.ReactNode | Iterable<React.ReactNode>;
  title?: string;
  type?: 'primary' | 'outline' | 'clean';
  activeOpacity?: number;
}

export const Button = memo(
  ({
    children,
    title,
    type = 'primary',
    activeOpacity = 0.6,
    ...otherProps
  }: ButtonProps) => {
    const displayContent = useMemo(() => title || children, [title, children]);

    const style = useStyleProps(otherProps);

    const content = useMemo(
      () =>
        onCheckType(displayContent, 'string') ? (
          <HeaderText bold>{displayContent}</HeaderText>
        ) : (
          displayContent
        ),
      [displayContent],
    );

    const buttonStyle = useCallback(
      ({ pressed }: PressableStateCallbackType) =>
        getObjectStyle([style, { opacity: pressed ? activeOpacity : 1 }]),
      [activeOpacity, style],
    );

    return (
      <Container type={type} style={buttonStyle} {...otherProps}>
        {content}
      </Container>
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

  const _onPressIn = useCallback<NonNull<typeof onPressIn>>(
    e => {
      animationScale(true);
      onPressIn?.(e);
    },
    [animationScale, onPressIn],
  );

  const _onPressOut = useCallback<NonNull<typeof onPressOut>>(
    e => {
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
  ${({ type }) => {
    switch (type) {
      case 'outline':
        return css`
          background-color: transparent;
          border-width: ${dimensionPx.borderWidth};
        `;

      case 'clean':
        return css`
          background-color: transparent;
          align-items: flex-start;
        `;

      default:
        return css``;
    }
  }}
`;

const Container = styled(Pressable)<ButtonProps>`
  background-color: ${({ theme }) => theme.primary};
  border-color: ${({ theme }) => theme.primary};
  padding: ${scapingPX.smaller};
  border-radius: ${dimensionPx.borderRadius};
  padding: ${scapingPX.small};
  margin-vertical: ${scapingPX.small};
  align-items: center;
  ${presentStyleCss}
`;
