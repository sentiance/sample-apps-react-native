import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {TextViewProps} from './typings';

// TextView component which takes title and status as props

const TextView: FC<TextViewProps> = ({title, status}): JSX.Element => {
  const statusText = () => {
    if (status === 'error') {
      return <Text style={styles.statusErrorText}>NEVER</Text>;
    } else if (status === 'success') {
      return <Text style={styles.statusSuccessText}>ALWAYS</Text>;
    } else {
      <Text style={styles.statusProgressText}>WHILE IN USE</Text>;
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
