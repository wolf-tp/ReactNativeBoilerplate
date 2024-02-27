/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, forwardRef, useImperativeHandle } from 'react';

import { useDispatch } from 'react-redux';

export * from './redux-subscribe-action';
export * from './listener';

type ActionBase<T = any> = {
  type: string;
  payload?: T;
};

const RXStoreComponent = forwardRef((_, ref) => {
  // state
  const dispatchRx = useDispatch();

  // effect
  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: ActionBase) => {
        dispatchRx(action);
      },
    }),
    [dispatchRx],
  );
  return null;
});

type RXStoreType = {
  dispatch: (action: ActionBase) => void;
};

const storeRef = createRef<RXStoreType>();

export const RXStore = () => <RXStoreComponent ref={storeRef} />;

export const dispatch = (action: ActionBase) => {
  if (storeRef.current) {
    storeRef.current.dispatch(action);
  }
};
