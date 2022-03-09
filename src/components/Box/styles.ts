import styled from 'styled-components/native';
import {BoxProps} from './typings';

export const StyledBoxView = styled.View<BoxProps>`
  background-color: ${props => props.theme.color.none};
  border-radius: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing[props.marginBottom ?? 'none']};
  padding: ${props => props.theme.spacing.sm};
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-radius: ${props => props.theme.spacing.lg};
  shadow-opacity: 1;
  elevation: 3;
`;
