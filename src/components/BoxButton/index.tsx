import React, {FC} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import {BoxButtonProps} from './typings';
import {attach, forward} from '../../assets';
import Box from '../Box';

//Box Button component takes on click event as props

const BoxButton: FC<BoxButtonProps> = ({onPress, title}): JSX.Element => {
  return (
    <Box>
      <View style={styles.boxView}>
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.imageView} source={attach} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.bottomView}>
            <Text>{title}</Text>
            <Image style={styles.forwardImage} source={forward} />
          </View>
        </TouchableOpacity>
      </View>
    </Box>
  );
};

export default BoxButton;
