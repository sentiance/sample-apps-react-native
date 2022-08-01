import React, {FC} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {BadgeProps} from './typings';

//Badge panel component takes inside title, status and status description text as props

const Badge: FC<BadgeProps> = ({title, status}): JSX.Element => {
  const toCapitaliseText = (str: string) => {
    return str.charAt(0) + str.slice(1).toLowerCase();
  };

  const showBadge = () => {
    if (status === 'ENABLED_AND_DETECTING' || status === 'INITIALIZED') {
      return (
        <View style={styles.statusSuccessView}>
          <View style={styles.dotSuccessView} />
          <Text style={styles.statusSuccessText}>
            {toCapitaliseText(status)}
          </Text>
        </View>
      );
    } else if (status !== 'ENABLED_BUT_BLOCKED') {
      return (
        <View style={styles.statusPendingView}>
          <View style={styles.dotPendingView} />
          <Text style={styles.statusPendingText}>
            {toCapitaliseText(status)}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.statusFailureView}>
          <View style={styles.dotFailureView} />
          <Text style={styles.statusFailureText}>
            {toCapitaliseText(status)}
          </Text>
        </View>
      );
    }
  };

  return (
    <View>
      <Text style={styles.badgeTitle}>{title}</Text>
      {showBadge()}
    </View>
  );
};

export default Badge;
