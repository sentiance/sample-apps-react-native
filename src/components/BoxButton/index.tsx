import React, {FC} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {BoxButtonProps} from './typings';
import {attach, forward, attachDisable, forwardDisable} from '../../assets';
import Box from '../Box';

//Box Button component takes on click event as props

const BoxButton: FC<BoxButtonProps> = ({
  onPress,
  title,
  inactive,
}): JSX.Element => {
  return inactive ? (
    <View style={styles.sdkBoxView}>
      <Box>
        <View style={styles.boxView}>
          <Image style={styles.imageView} source={attachDisable} />
          <View style={styles.bottomView}>
            <Text style={styles.diableText}>{title}</Text>
            <Image style={styles.forwardImage} source={forwardDisable} />
          </View>
        </View>
      </Box>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.sdkBoxView}>
        <Box>
          <View style={styles.boxView}>
            <Image style={styles.imageView} source={attach} />
            <View style={styles.bottomView}>
              <Text>{title}</Text>
              <Image style={styles.forwardImage} source={forward} />
            </View>
          </View>
        </Box>
      </View>
    </TouchableOpacity>
  );
};

export default BoxButton;
