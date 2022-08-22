import { Dimensions } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
export const sizeScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const dimension = {
  iconCheckBoxSize: wp('6.8%'),
  iconFavoriteSize: wp('5.8%'),
  iconFavoriteAroundSize: wp('10.8%'),
  miniIconSize: wp('5.2%'),

  pickerItemTextSize: wp('6%'),

  borderWidth: wp('0.32%'),
  borderBottomBar: wp('5%'),

  bottomSheetHeaderMargin: wp('8.8%'),
  buttonHeight: wp('13%'),
  buttonShortHeight: wp('11.44%'),

  appMargin: wp('5%'),
  multipleTextFieldHeight: wp('46%'),
  progressHeight: wp('0.44%'),
  smallBorder: wp('3%'),
  borderRadius: wp('5%'),
};

export const fontSize = {
  bigHeaderTextSize: wp('4.5%'),
  headerTextSize: wp('4%'),
  bodyTextSize: wp('3.5%'),
  labelTextSize: wp('3%'),
  miniLabelTextSize: wp('2.5%'),
};
export const fontWeight = {
  large: wp('3.4%'),
  medium: wp('2,4%'),
  small: wp('1.8%'),
  tiny: wp('1%'),
  none: wp('0%'),
};
export const lineSpace = {
  massive: wp('8%'),
  large: wp('3.4%'),
  medium: wp('2,4%'),
  small: wp('1.8%'),
  tiny: wp('1%'),
  none: wp('0%'),
};

export const appSize = {
  none: wp('0%'),
  tiny: wp('1%'),
  smaller: wp('2%'),
  small: wp('4%'),
  medium: wp('6%'),
  mediumPlus: wp('8%'),
  large: wp('10%'),
  huge: wp('12%'),
  massive: wp('14%'),
};

export const scaping = {
  none: wp('0%'),
  tiny: wp('1%'),
  smaller: wp('2%'),
  small: wp('4%'),
  medium: wp('6%'),
  mediumPlus: wp('8%'),
  large: wp('10%'),
  huge: wp('12%'),
  massive: wp('14%'),
};
