import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {ButtonProps} from './typings';

//Button component takes inside text and on click event as props

const Button: FC<ButtonProps> = ({text, onClick, type}): JSX.Element => {
  return type === 'hollow' ? (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.buttonHollowView}>
        <Text style={styles.buttonHollowText}>{text}</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.buttonView}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
