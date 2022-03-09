import {DefaultTheme} from 'styled-components';
import {moderateScale} from './scaling';

import colors from './colors';
const theme: DefaultTheme = {
  colors,
  color: {
    primary: colors.primary,
    secondary: colors.secondary,
    none: colors.none,
    default: colors.default,
    grey: colors.grey,
    success: colors.success,
    error: colors.error,
    lightBlue: colors.lightBlue,
  },
  font: {
    family: {
      base: 'Nunito-Regular',
    },
    size: {
      h1: `${moderateScale(36)}px`,
      h2: `${moderateScale(24)}px`,
      h3: `${moderateScale(20)}px`,
      h4: `${moderateScale(12)}px`,
      h5: `${moderateScale(10)}px`,
      p: `${moderateScale(16)}px`,
      sm: `${moderateScale(14)}px`,
      lg: `${moderateScale(48)}px`,
      xl: `${moderateScale(72)}px`,
    },
  },
  spacing: {
    none: '0px',
    xxs: '4px',
    xs: '8px',
    sm: '10px',
    md: '16px',
    lg: '30px',
    xl: '60px',
    xxl: '120px',
    xxxl: '250px',
  },
  radius: {
    md: '6px',
  },
};

export default theme;
