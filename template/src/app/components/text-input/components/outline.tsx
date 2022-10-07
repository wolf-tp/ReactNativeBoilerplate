/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { useInterpolate, useSharedTransition } from '@animated';
import { isIOS, onCheckType, scaping, useTheme } from '@common';

import { Text } from '../../text';
import { InputBaseProps } from '../type';

const UN_ACTIVE_COLOR = 'rgb(159,152,146)';
const ERROR_COLOR = 'rgb(214,45,32)';
const BOTTOM_SCAPING_TITLE = Platform.select({
  android: scaping.tiny,
  ios: 0,
}) as number;

export const InputOutline = forwardRef<any, InputBaseProps>((props, ref) => {
  const theme = useTheme();
  const ACTIVE_COLOR = theme.primary;

  // props
  const {
    label,
    labelTx,
    rxRemove,
    placeholder,
    defaultValue,
    rightChildren,
    onBlur,
    onFocus,
    onSubmit,
    onChangeText,
    error = undefined,
    disabled = false,
    inputStyle: inputStyleOverwrite = {},
    containerStyle: containerStyleOverwrite = {},
    errorLabelColor = ERROR_COLOR,
    placeholderColor = UN_ACTIVE_COLOR,
    errorBorderColor = ERROR_COLOR,
    disabledLabelColor = UN_ACTIVE_COLOR,
    activeTintBorderColor = ACTIVE_COLOR,
    activeTintLabelColor = ACTIVE_COLOR,
    unActiveTintBorderColor = UN_ACTIVE_COLOR,
    unActiveTintLabelColor = UN_ACTIVE_COLOR,
    disabledBorderColor = UN_ACTIVE_COLOR,
    ...rest
  } = props;

  // state
  const [heightContainerInput, setHeightContainerInput] = useState(0);
  const [localDefaultValue, setLocalDefaultValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  // reanimated
  const progress = useSharedTransition(focused || value.length > 0, {
    duration: 150,
  });

  const bottom = useInterpolate(
    progress,
    [0, 1],
    [BOTTOM_SCAPING_TITLE, heightContainerInput],
  );

  const fontLabel = useInterpolate(progress, [0, 1], [14, 12]);

  const labelColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledLabelColor;
      case error:
        return errorLabelColor;
      case focused:
        return activeTintLabelColor;
      default:
        return unActiveTintLabelColor;
    }
  });

  const borderColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledBorderColor;
      case error:
        return errorBorderColor;
      case focused:
        return activeTintBorderColor;
      default:
        return unActiveTintBorderColor;
    }
  });

  // function
  const onLayoutContainerInput = (e: LayoutChangeEvent) => {
    setHeightContainerInput(
      e.nativeEvent.layout.height - (isIOS ? 0 : scaping.tiny),
    );
  };

  const _onFocus = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (onCheckType(onFocus, 'function')) {
      onFocus(e);
    }
    setFocused(true);
  };

  const _onBlur = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (onCheckType(onBlur, 'function')) {
      onBlur(e);
    }
    setFocused(false);
  };

  const _onChangeText = (text: string) => {
    const actualText =
      rxRemove !== undefined ? text.replace(rxRemove, '') : text;
    setValue(actualText);
    if (onCheckType(onChangeText, 'function')) {
      onChangeText(actualText);
    }
  };

  // effect
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setLocalDefaultValue(String(defaultValue));
    }
  }, [defaultValue]);

  // string
  const labelText = useMemo(
    () => labelTx || label || undefined,
    [labelTx, label],
  );

  const placeHolder = useMemo(() => placeholder || '', [placeholder]);

  // reanimated style
  const wrapLabelStyle = useAnimatedStyle(() => ({
    bottom: bottom.value,
  }));

  const labelStyle = useAnimatedStyle(() => ({
    fontSize: fontLabel.value,
    color: labelColor.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  // render
  return (
    <Animated.View
      style={[
        styles.container,
        containerStyleOverwrite,
        containerAnimatedStyle,
      ]}>
      <View style={[styles.content]}>
        {placeholder && value.length === 0 && (
          <View style={[styles.wrapPlaceHolder]} pointerEvents={'none'}>
            <Text color={placeholderColor}>{placeHolder}</Text>
          </View>
        )}
        {labelText && (
          <Animated.View
            pointerEvents={'none'}
            style={[styles.wrapLabel, wrapLabelStyle]}>
            <Animated.Text style={[styles.text, labelStyle]}>
              {labelText ?? ''}
            </Animated.Text>
          </Animated.View>
        )}
        <View style={[styles.flex]} onLayout={onLayoutContainerInput}>
          <TextInput
            defaultValue={localDefaultValue}
            autoCorrect={false}
            editable={!disabled}
            clearButtonMode={'never'}
            selectionColor={activeTintBorderColor}
            style={[styles.input, inputStyleOverwrite]}
            ref={ref}
            onSubmitEditing={onSubmit}
            {...rest}
            onChangeText={_onChangeText}
            onFocus={_onFocus}
            onBlur={_onBlur}
          />
        </View>
        {rightChildren}
      </View>
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingVertical: scaping.small,
    marginVertical: scaping.smaller,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scaping.small,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  input: {
    color: '#000',
    padding: 0,
    borderBottomColor: 'transparent',
    paddingLeft: scaping.tiny,
  },
  text: {
    alignSelf: 'flex-start',
    zIndex: 4,
    left: scaping.smaller,
  },
  wrapLabel: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  wrapPlaceHolder: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingLeft: scaping.tiny,
  },
  flex: {
    flex: 1,
    paddingHorizontal: scaping.tiny,
  },
});
