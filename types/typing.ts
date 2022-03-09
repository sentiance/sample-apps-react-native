// typing values for text size
export interface TextSize {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  p: string;
  sm: string;
  lg: string;
  xl: string;
}

// typing values for spacing of components
export interface Spacing {
  none: string;
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

// typing for color values used for components
export interface Color {
  primary: string;
  none: string;
  default: string;
  grey: string;
  success: string;
  error: string;
}

export type SpacingNames = keyof Spacing;
export type ColorNames = keyof Color;
