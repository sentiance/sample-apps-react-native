import {Dimensions} from 'react-native';

// Based on https://github.com/nirsky/react-native-size-matters/blob/master/lib/scaling-utils.js/

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number): number =>
  (Dimensions.get('window').width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (Dimensions.get('window').height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.2): number =>
  size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale};
