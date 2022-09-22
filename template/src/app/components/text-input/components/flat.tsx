/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import {
  useInterpolate,
  useSharedAnimated,
  useSharedTransition,
} from '@animated';
import { onCheckType } from '@common';

import { LabelText } from '../../text';
import { InputBaseProps } from '../type';

const UN_ACTIVE_COLOR = 'rgb(159,152,146)';
const ACTIVE_COLOR = 'rgb(0,87,231)';
const ERROR_COLOR = 'rgb(214,45,32)';

const ANIMATED_DURATION = 150;

export const InputFlat = forwardRef<any, InputBaseProps>((props, ref) => {
  // props
  const {
    label,
    rxRemove,
    placeholder,
    defaultValue,
    error = undefined,
    disabled = false,
    inputStyle: inputStyleOverwrite = {},
    rightChildren = undefined,
    containerStyle: containerStyleOverwrite = {},
    errorLabelColor = ERROR_COLOR,
    errorBorderColor = ERROR_COLOR,
    placeholderColor = UN_ACTIVE_COLOR,
    disabledLabelColor = UN_ACTIVE_COLOR,
    disabledBorderColor = UN_ACTIVE_COLOR,
    activeTintLabelColor = ACTIVE_COLOR,
    activeTintBorderColor = ACTIVE_COLOR,
    unActiveTintLabelColor = UN_ACTIVE_COLOR,
    unActiveTintBorderColor = UN_ACTIVE_COLOR,
    onBlur,
    onFocus,
    onSubmit,
    onChangeText,
    ...rest
  } = props;

  // state
  const [heightContainerInput, setHeightContainerInput] = useState(0);
  const [focused, setFocused] = useState(false);
  const [localDefaultValue, setLocalDefaultValue] = useState('');
  const [value, setValue] = useState('');

  // reanimated
  const progress = useSharedTransition(focused || value.length > 0, {
    duration: ANIMATED_DURATION,
  });
  const [placeholderStyleAnimated] = useSharedAnimated({
    state: focused && !!placeholder && value.length === 0,
    withStyle: value => {
      'worklet';
      return { opacity: value.value };
    },
  });

  const bottom = useInterpolate(progress, [0, 1], [0, heightContainerInput]);

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
    setHeightContainerInput(e.nativeEvent.layout.height);
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
  const labelText = useMemo(() => label, [label]);

  const placeHolder = useMemo(() => placeholder, [placeholder]);

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
          <Animated.View
            style={[styles.wrapPlaceHolder, placeholderStyleAnimated]}
            pointerEvents={'none'}>
            <LabelText color={placeholderColor}>{placeHolder}</LabelText>
          </Animated.View>
        )}
        {labelText && (
          <Animated.View
            pointerEvents={'none'}
            style={[styles.wrapLabel, wrapLabelStyle]}>
            <Animated.Text style={[labelStyle]}>
              {labelText ?? ''}
            </Animated.Text>
          </Animated.View>
        )}
        <View style={[styles.flex]} onLayout={onLayoutContainerInput}>
          <TextInput
            defaultValue={localDefaultValue}
            autoCorrect={false}
            selectionColor={activeTintBorderColor}
            underlineColorAndroid={'transparent'}
            clearButtonMode={'never'}
            editable={!disabled}
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
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 5,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  input: {
    color: '#000',
    padding: 0,
    borderBottomColor: 'transparent',
  },
  text: {
    alignSelf: 'flex-start',
    zIndex: 4,
    left: 5,
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
    paddingLeft: 5,
  },
  flex: {
    flex: 1,
    paddingHorizontal: 5,
  },
});
