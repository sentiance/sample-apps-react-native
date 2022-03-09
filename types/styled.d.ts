import 'styled-components';

import {Color, Spacing, TextSize, Radius} from './typing';
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: any;
    color: Color;
    font: {
      family: {
        base: string;
      };
      size: TextSize;
    };
    spacing: Spacing;
    radius: Radius;
  }
}
