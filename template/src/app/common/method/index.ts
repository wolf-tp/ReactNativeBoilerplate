/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, memo as memoReact } from 'react';
import { Alert, Platform } from 'react-native';

import isEqual from 'react-fast-compare';

import { sizeScale } from '../scale';

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

export const propsToStyle = <T = Record<string, number | string>>(
  arrStyle: Array<T>,
) => {
  return arrStyle
    .filter(
      x => x !== undefined && !Object.values(x).some(v => v === undefined),
    )
    .reduce((prev: Record<string, number | string>, curr) => {
      const firstKey = Object.keys(curr)[0] as keyof T;
      const firstValue = curr[firstKey];

      if (
        !['opacity', 'zIndex', 'flex'].includes(firstKey as string) &&
        typeof firstValue === 'number'
      ) {
        (curr[firstKey] as unknown as number) = sizeScale(firstValue);
      }
      return { ...prev, ...curr };
    }, {} as Record<string, number | string>);
};

export const execFunc = <Fn extends (...args: any[]) => any>(
  func?: Fn,
  ...args: Parameters<Fn>
) => {
  if (onCheckType(func, 'function')) {
    return func(...args);
  }
};
export const isUndefined = (value: any) => value === undefined;

export const isArray = (value: any) => Array.isArray(value);

export const isIOS = Platform.OS === 'ios';

export const memo = <T extends ComponentType<any>>(component: T) =>
  memoReact(component, isEqual);
