/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, memo as memoReact } from 'react';
import { Alert, Falsy, Platform } from 'react-native';

import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const onShowErrorBase = (msg: string) => {
  Alert.alert(msg);
};
export const onCheckType = (
  source: any,
  ...types: TypesBase[]
): source is TypesBase => {
  return types?.includes(typeof source);
};
export const checkKeyInObject = <Type extends Record<string, unknown>>(
  T: Type,
  key: keyof Type,
) => {
  return Object.keys(T).includes(key as string);
};

export const execFunc = <Fn extends (...args: any[]) => any>(
  func?: Fn,
  ...args: Parameters<Fn>
) => {
  if (onCheckType(func, 'function')) {
    return func(...args);
  }
};

export const removeUndefinedField = <T extends Record<string, any>>(
  value: T,
) => {
  Object.keys(value).forEach(
    (key: any) => isUndefined(value[key]) && delete value[key],
  );
  return value;
};
export const isUndefined = (...value: any[]) =>
  value?.every(value => value === undefined);

export const isArray = (value: any) => Array.isArray(value);

export const maybe = <T>(value: T | Falsy) => value || undefined;
export const mb = <T, DefaultType>(
  value: T | Falsy,
  defaultValue: DefaultType,
) => value || defaultValue;

export const capitalizeFirstLetter = (string: string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

export const isIOS = Platform.OS === 'ios';

export const memo = <T extends ComponentType<any>>(component: T) =>
  memoReact(component, isEqual);

export type Translate = Parameters<
  ReturnType<typeof useTranslation<'en'>>['t']
>['0'];

export type TransText = {
  text?: string;
  tx?: Translate;
};
