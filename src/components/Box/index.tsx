import React, {FC} from 'react';

import {StyledBoxView} from './styles';
import {BoxProps} from './typings';

const Box: FC<BoxProps> = ({children, marginBottom}): JSX.Element => {
  return <StyledBoxView marginBottom={marginBottom}>{children}</StyledBoxView>;
};

export default Box;
