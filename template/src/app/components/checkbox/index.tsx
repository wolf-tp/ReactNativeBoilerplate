import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import { ImageSvg } from '@assets';
import {
  memo,
  onCheckType,
  RowTouch,
  scapingPX,
  styled,
  TransText,
  useTranslateProps,
} from '@common';

import { BodyText } from '../text';

export type CheckboxProps = {
  onPress?: (checked: boolean) => void;
  initChecked?: boolean;
} & TransText;

export const Checkbox = memo(
  forwardRef(
    ({ initChecked, ...props }: CheckboxProps, ref: Ref<CheckboxRef>) => {
      const [checked, setChecked] = useState<boolean>(!!initChecked);
      const textContent = useTranslateProps(props);

      const onToggle = useCallback(
        () => setChecked(_checked => !_checked),
        [setChecked],
      );

      useImperativeHandle(
        ref,
        () => ({
          getValue: () => !!checked,
          toggle: _checked => {
            if (onCheckType(_checked, 'undefined')) {
              onToggle();
              return;
            }
            setChecked(!!_checked);
          },
        }),
        [checked, onToggle],
      );

      return (
        <RowTouch onPress={onToggle}>
          <ImageSvg name="Checkbox" {...{ checked }} />
          <TextContent>{textContent}</TextContent>
        </RowTouch>
      );
    },
  ),
);
const TextContent = styled(BodyText)`
  margin-left: ${scapingPX.tiny};
  margin-vertical: ${scapingPX.small};
`;

type CheckboxRef = {
  toggle: (checked?: boolean) => void;
  getValue: () => boolean | undefined;
};
