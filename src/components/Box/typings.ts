import {ViewProps} from 'react-native';
import {SpacingNames} from '../../../types/typing';

// typings for Box Component
export interface BoxProps {
  children: ViewProps;
  marginBottom?: SpacingNames;
}
