import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {TextViewProps} from './typings';

// TextView component which takes title and status as props

const TextView: FC<TextViewProps> = ({title, status}): JSX.Element => {
  const statusText = () => {
    if (status === 'NEVER' || status === 'DENIED') {
      return <Text style={styles.statusErrorText}>{status}</Text>;
    } else if (status === 'ALWAYS') {
      return <Text style={styles.statusSuccessText}>{status}</Text>;
    } else {
      return <Text style={styles.statusProgressText}>{status}</Text>;
    }
  };
  return (
    <View style={styles.textView}>
      <Text style={styles.textTitle}>{title}</Text>
      {statusText()}
    </View>
  );
};

export default TextView;
