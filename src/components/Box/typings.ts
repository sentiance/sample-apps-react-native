import {ViewProps} from 'react-native';
import {SpacingNames} from '../../../types/typing';

export interface BoxProps {
  children: ViewProps;
  marginBottom?: SpacingNames;
}
