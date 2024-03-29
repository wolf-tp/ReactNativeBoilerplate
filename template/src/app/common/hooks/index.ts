/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BackHandler,
  EmitterSubscription,
  Keyboard,
  LayoutAnimation,
  Platform,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { useSelector as useReduxSelector } from 'react-redux';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { RootState } from '@store/all-reducers';

import { onCheckType, TransText } from '../method';
export * from './useStyleProps';

type UseStateFull<T = any> = {
  value: T;
  setValue: React.Dispatch<SetStateAction<T>>;
};

function useSelector<T>(
  selector: (state: RootState) => T,
  equalityFn = isEqual,
): T {
  return useReduxSelector<RootState, T>(selector, equalityFn);
}
type ConfigAnimated = {
  duration: number;
  type: keyof typeof LayoutAnimation.Types;
  creationProp: keyof typeof LayoutAnimation.Properties;
};

function useAnimatedState<T>(
  initialValue: T,
  config: ConfigAnimated = {
    duration: 500,
    creationProp: 'opacity',
    type: 'easeInEaseOut',
  },
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);

  const onSetState = useCallback(
    (newValue: T | ((prevState: T) => T)) => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          config.duration,
          LayoutAnimation.Types[config.type],
          LayoutAnimation.Properties[config.creationProp],
        ),
      );
      setValue(newValue);
    },
    [config],
  );
  return [value, onSetState];
}

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

type NetInfoTuple = [boolean, boolean];
function useNetWorkStatus(): NetInfoTuple {
  const [status, setStatus] = useState<boolean>(false);
  const [canAccess, setCanAccess] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus(state.isConnected ?? false);
      setCanAccess(state.isInternetReachable ?? false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return [status, canAccess];
}

type UseArrayActions<T> = {
  setValue: UseStateFull<T[]>['setValue'];
  add: (value: T | T[]) => void;
  push: (value: T | T[]) => void;
  pop: () => void;
  shift: () => void;
  unshift: (value: T | T[]) => void;
  clear: () => void;
  move: (from: number, to: number) => void;
  removeById: (
    id: T extends { id: string }
      ? string
      : T extends { id: number }
      ? number
      : unknown,
  ) => void;
  modifyById: (
    id: T extends { id: string }
      ? string
      : T extends { id: number }
      ? number
      : unknown,
    newValue: Partial<T>,
  ) => void;
  removeIndex: (index: number) => void;
};
type UseArray<T = any> = [T[], UseArrayActions<T>];
function useArray<T = any>(initial: T[]): UseArray<T> {
  const [value, setValue] = useState(initial);

  const push = useCallback((a: any) => {
    setValue(v => [...v, ...(Array.isArray(a) ? a : [a])]);
  }, []);

  const unshift = useCallback(
    (a: any) => setValue(v => [...(Array.isArray(a) ? a : [a]), ...v]),
    [],
  );

  const pop = useCallback(() => setValue(v => v.slice(0, -1)), []);

  const shift = useCallback(() => setValue(v => v.slice(1)), []);

  const move = useCallback(
    (from: number, to: number) =>
      setValue(it => {
        const copy = it.slice();
        copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0]);
        return copy;
      }),
    [],
  );

  const clear = useCallback(() => setValue(() => []), []);

  const removeById = useCallback(
    (id: any) => setValue(arr => arr.filter((v: any) => v && v.id !== id)),
    [],
  );

  const removeIndex = useCallback(
    (index: number) =>
      setValue(v => {
        const copy = v.slice();
        copy.splice(index, 1);
        return copy;
      }),
    [],
  );

  const modifyById = useCallback(
    (id: any, newValue: any) =>
      setValue(arr =>
        arr.map((v: any) => (v.id === id ? { ...v, ...newValue } : v)),
      ),
    [],
  );

  const actions = useMemo(
    () => ({
      setValue,
      add: push,
      unshift,
      push,
      move,
      clear,
      removeById,
      removeIndex,
      pop,
      shift,
      modifyById,
    }),
    [
      modifyById,
      push,
      unshift,
      move,
      clear,
      removeById,
      removeIndex,
      pop,
      shift,
    ],
  );
  return [value, actions];
}

type UseBooleanActions = {
  setValue: React.Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};
type UseBoolean = [boolean, UseBooleanActions];
function useBoolean(initial: boolean): UseBoolean {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  const actions = useMemo(
    () => ({ setValue, toggle, setTrue, setFalse }),
    [setFalse, setTrue, toggle],
  );

  return useMemo(() => [value, actions], [actions, value]);
}

type UseNumberActions = {
  setValue: React.Dispatch<SetStateAction<number>>;
  increase: (value?: number) => void;
  decrease: (value?: number) => void;
};
type UseNumber = [number, UseNumberActions];
function useNumber(
  initial: number,
  {
    upperLimit,
    lowerLimit,
    loop,
    step = 1,
  }: {
    upperLimit?: number;
    lowerLimit?: number;
    loop?: boolean;
    step?: number;
  } = {},
): UseNumber {
  const [value, setValue] = useState<number>(initial);

  const decrease = useCallback(
    (d?: number) => {
      setValue(aValue => {
        const decreaseBy = d !== undefined ? d : step;
        const nextValue = aValue - decreaseBy;

        if (lowerLimit !== undefined) {
          if (nextValue < lowerLimit) {
            if (loop && upperLimit) {
              return upperLimit;
            }

            return lowerLimit;
          }
        }

        return nextValue;
      });
    },
    [loop, lowerLimit, step, upperLimit],
  );

  const increase = useCallback(
    (i?: number) => {
      setValue(aValue => {
        const increaseBy = i !== undefined ? i : step;
        const nextValue = aValue + increaseBy;

        if (upperLimit !== undefined) {
          if (nextValue > upperLimit) {
            if (loop) {
              return initial;
            }
            return upperLimit;
          }
        }

        return nextValue;
      });
    },
    [initial, loop, step, upperLimit],
  );

  const actions = useMemo(
    () => ({
      setValue,
      increase,
      decrease,
    }),
    [decrease, increase],
  );

  return [value, actions];
}

function useStateFull<T = any>(initial: T): UseStateFull<T> {
  const [value, setValue] = useState(initial);

  return useMemo(
    () => ({
      value,
      setValue,
    }),
    [value],
  );
}

function usePrevious<T = any>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

type UseSetArrayStateAction<T extends object> = React.Dispatch<
  SetStateAction<Partial<T>>
>;
type UseSetStateArray<T extends object> = [
  T,
  UseSetArrayStateAction<T>,
  () => void,
];
function useSetStateArray<T extends object>(
  initialValue: T,
): UseSetStateArray<T> {
  const [value, setValue] = useState<T>(initialValue);

  const setState = useCallback(
    (v: SetStateAction<Partial<T>>) => {
      return setValue(oldValue => ({
        ...oldValue,
        ...(typeof v === 'function' ? v(oldValue) : v),
      }));
    },
    [setValue],
  );

  const resetState = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setState, resetState];
}

type UseSetStateAction<T extends object> = React.Dispatch<
  SetStateAction<Partial<T>>
>;
type UseSetState<T extends object> = {
  setState: UseSetStateAction<T>;
  state: T;
  resetState: () => void;
};
function useSetState<T extends object>(initialValue: T): UseSetState<T> {
  const [state, setState, resetState] = useSetStateArray(initialValue);

  return useMemo(
    () => ({
      setState,
      resetState,
      state,
    }),
    [setState, resetState, state],
  );
}

function useAsyncState<T>(
  initialValue: T,
): [
  T,
  (newValue: SetStateAction<T>, callback?: (newState: T) => void) => void,
] {
  const [state, setState] = useState(initialValue);
  const _callback = useRef<(newState: T) => void>();

  const _setState = (
    newValue: SetStateAction<T>,
    callback?: (newState: T) => void,
  ) => {
    if (callback) {
      _callback.current = callback;
    }
    setState(newValue);
  };

  useEffect(() => {
    if (typeof _callback.current === 'function') {
      _callback.current(state);
      _callback.current = undefined;
    }
  }, [state]);
  return [state, _setState];
}

function useUnMount(callback: () => void) {
  return useEffect(() => () => callback(), []);
}

function useDidMount(callback: () => void) {
  return useEffect(callback, []);
}

function useForceUpdate() {
  const unloadingRef = useRef(false);
  const [forcedRenderCount, setForcedRenderCount] = useState(0);

  useUnMount(() => (unloadingRef.current = true));

  return useCallback(() => {
    !unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
}

function useIsKeyboardShown() {
  const [isKeyboardShown, setIsKeyboardShown] = React.useState(false);

  React.useEffect(() => {
    const handleKeyboardShow = () => setIsKeyboardShown(true);
    const handleKeyboardHide = () => setIsKeyboardShown(false);
    let keyboardWillShow: EmitterSubscription;
    let keyboardWillHide: EmitterSubscription;
    let keyboardDidShow: EmitterSubscription;
    let keyboardDidHide: EmitterSubscription;
    if (Platform.OS === 'ios') {
      keyboardWillShow = Keyboard.addListener(
        'keyboardWillShow',
        handleKeyboardShow,
      );
      keyboardWillHide = Keyboard.addListener(
        'keyboardWillHide',
        handleKeyboardHide,
      );
    } else {
      keyboardDidShow = Keyboard.addListener(
        'keyboardDidShow',
        handleKeyboardShow,
      );
      keyboardDidHide = Keyboard.addListener(
        'keyboardDidHide',
        handleKeyboardHide,
      );
    }

    return () => {
      if (Platform.OS === 'ios') {
        keyboardWillShow.remove();
        keyboardWillHide.remove();
      } else {
        keyboardDidShow.remove();
        keyboardDidHide.remove();
      }
    };
  }, []);

  return isKeyboardShown;
}

function useDisableBackHandler(disabled: boolean, callback?: () => void) {
  // function
  const onBackPress = useCallback(() => {
    if (onCheckType(callback, 'function')) {
      callback();
    }
    return true;
  }, [callback]);

  useEffect(() => {
    if (disabled) {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [disabled, onBackPress]);
}

function useDismissKeyboard(isHide: boolean) {
  useEffect(() => {
    if (isHide) {
      Keyboard.dismiss();
    }
  }, [isHide]);
}

function useMounted(callback: () => void, deps: any[] = []) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      callback();
    }
  }, [...deps]);
}

/**
 * @description Like 'useCallback' but with empty deps array.
 * Don't use this hooks when you want to render something on React Tree.
 * It will return previous value like usePrevious. first render will return undefined.
 * @example
 * This will render the previous value. don't use this:
 * ```tsx
 * const total = useEventCallback(() => state1 + state2)
 * <Text>{total()}</Text>
 * ```
 *
 * Use this:
 * ```tsx
 * const [msg,setMsg] = useState('');
 * const sendMsg = useEventCallback(() => sendMsgToApi(msg));
 * ```
 */
const useEventCallback = <Fn extends (...args: any[]) => ReturnType<Fn>>(
  func: Fn,
) => {
  const callbackRef = useRef<(...args: Parameters<Fn>) => ReturnType<Fn>>();

  const callbackMemoized = useCallback((...args: Parameters<Fn>) => {
    return callbackRef.current?.(...args);
  }, []);

  useLayoutEffect(() => {
    callbackRef.current = (...args) => func(...args);
  });

  return callbackMemoized;
};

export {
  useDisableBackHandler,
  useDismissKeyboard,
  useInterval,
  useSelector,
  useNetWorkStatus,
  useArray,
  useBoolean,
  useNumber,
  useStateFull,
  usePrevious,
  useSetState,
  useAsyncState,
  useUnMount,
  useForceUpdate,
  useAnimatedState,
  useMounted,
  useIsKeyboardShown,
  useDidMount,
  useEventCallback,
};
export const useTranslate = () => {
  const { t } = useTranslation();
  return { translate: t };
};

export const useTranslateProps = ({ text, tx }: TransText): string => {
  const { translate } = useTranslate();
  return text || translate(tx as any) || '';
};
