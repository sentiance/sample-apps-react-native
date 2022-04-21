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
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.sdkBoxView}>
        <Box>
          <View style={styles.boxView}>
            <Image
              style={styles.imageView}
              source={inactive ? attachDisable : attach}
            />
            <View style={styles.bottomView}>
              <Text style={inactive ? styles.diableText : null}>{title}</Text>
              <Image
                style={styles.forwardImage}
                source={inactive ? forwardDisable : forward}
              />
            </View>
          </View>
        </Box>
      </View>
    </TouchableOpacity>
  );
};

export default BoxButton;
