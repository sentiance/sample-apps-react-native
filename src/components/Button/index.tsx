import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {ButtonProps} from './typings';

//Button component takes inside text and on click event as props

const Button: FC<ButtonProps> = ({text, onClick}): JSX.Element => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.buttonView}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
