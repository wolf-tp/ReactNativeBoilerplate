import React from 'react';

import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  SvgProps,
} from 'react-native-svg';

import { useTheme } from '@common';

export const UnAuthBg = (props: SvgProps) => (
  <Svg width={411} height={823} viewBox="0 0 411 823" fill="none" {...props}>
    <Path
      d="M44.569-112.381a7 7 0 0 1 9.562-2.562L591.42 195.261a7 7 0 0 1 2.562 9.562l-173.63 300.736c-2.221 3.846-8.116 1.555-7.155-2.782 23.509-106.173-65.783-203.359-173.563-188.906l-111.378 14.935C27.552 336.707-70.732 295.29-135.409 217.698l-5.878-7.052a.852.852 0 0 1-.084-.971l185.94-322.056Z"
      fill="#FFE1EC"
      fillOpacity={0.5}
    />
    <Path
      d="M-120-70a7 7 0 0 1 7-7h549a7 7 0 0 1 7 7v300.068c0 3.922-5.509 4.79-6.715 1.058-29.291-90.652-139.19-125.417-215.288-68.103l-80.915 60.943c-74.076 49.698-167.36 61.238-251.312 31.091l-8.26-2.966a.77.77 0 0 1-.51-.726V-70Z"
      fill="url(#a)"
    />
    <Path
      d="M458.043 1004.5a6.997 6.997 0 0 1-7.485 6.48l-547.58-39.46a7 7 0 0 1-6.479-7.485l21.567-299.292c.282-3.911 5.839-4.381 6.773-.572 22.7 92.523 129.817 135.097 209.837 83.4l85.086-54.97c77.456-44.245 171.328-49.051 252.897-12.948l8.025 3.552c.297.132.48.436.457.76L458.043 1004.5Z"
      fill="url(#b)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={161.5}
        y1={-77}
        x2={161.5}
        y2={303}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FD788C" />
        <Stop offset={1} stopColor="#F157A4" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={176.768}
        y1={991.249}
        x2={204.08}
        y2={612.232}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FD788C" />
        <Stop offset={1} stopColor="#F157A4" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export const HomeBottom = (props: SvgProps) => (
  <Svg width={22} height={26} viewBox="0 0 22 26" fill="none" {...props}>
    <Path d="M20.537 25.304H2.063a1.32 1.32 0 0 1-1.32-1.32V11.26c.021-.323.159-.628.388-.857l9.236-9.237a1.32 1.32 0 0 1 1.867 0l9.237 9.237a1.314 1.314 0 0 1 .385.933v12.649a1.32 1.32 0 0 1-1.32 1.319ZM11.3 3.964l-7.917 7.918v10.783h15.834V11.882L11.3 3.965Zm0 16.06c-.3-.261-.604-.517-.913-.767l-.062-.05c-1.527-1.246-3.43-2.797-3.43-4.724a2.375 2.375 0 0 1 2.426-2.374 2.65 2.65 0 0 1 1.979.88 2.651 2.651 0 0 1 1.98-.88 2.374 2.374 0 0 1 2.42 2.375c0 1.934-1.915 3.495-3.454 4.75l-.075.062a31.12 31.12 0 0 0-.872.731l.001-.002Z" />
  </Svg>
);
export const ActiveBottomTab = (props: SvgProps) => (
  <Svg width={70} height={70} viewBox="0 0 70 70" fill="none" {...props}>
    <G filter="url(#a)">
      <Circle cx={35} cy={35} r={35} fill="url(#b)" />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={35.3}
        y1={7.462}
        x2={35.3}
        y2={55.034}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#968AFD" />
        <Stop offset={1} stopColor="#7583FF" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export const CalendarBottomTab = (props: SvgProps) => (
  <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
    <Path
      d="M18.5347 3.94582H5.46521C3.05918 3.94582 1.1087 5.8963 1.1087 8.30233V19.1936C1.1087 21.5996 3.05918 23.5501 5.46521 23.5501H18.5347C20.9408 23.5501 22.8912 21.5996 22.8912 19.1936V8.30233C22.8912 5.8963 20.9408 3.94582 18.5347 3.94582Z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.10872 10.4806H22.8913M7.64348 1.7676V6.12411V1.7676ZM16.3565 1.7676V6.12411V1.7676Z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export const ProfileBottomTab = (props: SvgProps) => (
  <Svg width={36} height={35} viewBox="0 0 36 35" fill="none" {...props}>
    <Path d="M18.302 9.633a4.77 4.77 0 1 0 0 9.54 4.77 4.77 0 0 0 0-9.54Zm0 7.632a2.861 2.861 0 1 1 0-5.723 2.861 2.861 0 0 1 0 5.723Z" />
    <Path d="M17.818 3.91a13.355 13.355 0 1 0 13.355 13.355A13.37 13.37 0 0 0 17.818 3.91Zm-5.724 23.254V25.85a2.864 2.864 0 0 1 2.862-2.861h5.724a2.864 2.864 0 0 1 2.862 2.861v1.314a11.352 11.352 0 0 1-11.448 0Zm13.348-1.384a4.771 4.771 0 0 0-4.762-4.7h-5.724a4.771 4.771 0 0 0-4.762 4.7 11.448 11.448 0 1 1 15.249 0h-.001Z" />
  </Svg>
);
export const Checkbox = ({
  checked,
  ...props
}: SvgProps & { checked?: boolean }) => {
  const { primary } = useTheme();
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      stroke={primary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      color={primary}
      {...props}>
      <Rect
        x={21}
        y={3}
        width={18}
        height={18}
        rx={1}
        transform="rotate(90 21 3)"
      />
      {checked && <Path d="M6.667 12.667 10 16l7.333-7.333" />}
    </Svg>
  );
};
