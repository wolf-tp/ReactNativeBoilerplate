import React from 'react';

import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from 'react-native-svg';

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
