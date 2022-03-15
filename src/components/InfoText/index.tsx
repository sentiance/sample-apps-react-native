import React, {FC} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {TextProps} from './typings';
import {copy} from '../../assets';
import Clipboard from '@react-native-community/clipboard';

//Text component takes text, isCopied and title as props

const InfoText: FC<TextProps> = ({text, title, isCopied}): JSX.Element => {
  const copyToClipboard = (copiedText: string) => {
    Clipboard.setString(copiedText);
    Alert.alert('Copied to clipboard');
  };
  return (
    <View style={styles.TextView}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textInsideView}>
        <Text style={styles.text}>{text}</Text>
        {isCopied && (
          <TouchableOpacity onPress={() => copyToClipboard(text)}>
            <Image style={styles.image} source={copy} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InfoText;
