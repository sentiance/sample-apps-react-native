import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {BoxProps} from './typings';

//Box panel component takes inside view as props

const Box: FC<BoxProps> = ({children}): JSX.Element => {
  return <View style={styles.box}>{children}</View>;
};

export default Box;
