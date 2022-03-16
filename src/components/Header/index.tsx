import React, {FC} from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import {logo} from '../../assets';

// Header component with sentiance logo

const Header: FC = (): JSX.Element => {
  return (
    <View style={styles.headerView}>
      <Image style={styles.imageView} source={logo} />
    </View>
  );
};

export default Header;
