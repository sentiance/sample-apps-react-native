import React, {FC} from 'react';

import {StyledBoxView} from './styles';
import {BoxProps} from './typings';

//Box panel component takes margin bottom and inside view as props

const Box: FC<BoxProps> = ({children, marginBottom}): JSX.Element => {
  return <StyledBoxView marginBottom={marginBottom}>{children}</StyledBoxView>;
};

export default Box;
