import React, {FC} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {BadgeProps} from './typings';

//Badge panel component takes inside title, status and status description text as props

const Badge: FC<BadgeProps> = ({title, status, statusText}): JSX.Element => {
  return (
    <View>
      <Text style={styles.badgeTitle}>{title}</Text>
      {status === 'success' ? (
        <View style={styles.statusSuccessView}>
          <View style={styles.dotSuccessView} />
          <Text style={styles.statusSuccessText}>{statusText}</Text>
        </View>
      ) : (
        <View style={styles.statusFailureView}>
          <View style={styles.dotFailureView} />
          <Text style={styles.statusFailureText}>{statusText}</Text>
        </View>
      )}
    </View>
  );
};

export default Badge;
