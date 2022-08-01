import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {TextViewProps} from './typings';
import {
  permissionLocationRequest,
  permissionMotionRequest,
} from '../../helpers/permissions';
import constants from '../../constants';

// TextView component which takes title and status as props

const TextView: FC<TextViewProps> = ({type, title, status}): JSX.Element => {
  const statusText = () => {
    if (!status) {
      return (
        <TouchableOpacity
          onPress={
            type === 'LOCATION'
              ? permissionLocationRequest
              : permissionMotionRequest
          }
          style={styles.styleTouchableOpacity}>
          <Text style={styles.statusGivePermissionsText}>Give permission</Text>
        </TouchableOpacity>
      );
    } else if (status === constants.PERMISSION_GRANTED) {
      return (
        <Text style={styles.statusSuccessText}>{status.toUpperCase()}</Text>
      );
    } else {
      return <Text style={styles.statusErrorText}>{status.toUpperCase()}</Text>;
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
