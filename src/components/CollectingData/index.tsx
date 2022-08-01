import React, {FC} from 'react';
import {Image, View, Text} from 'react-native';
import styles from './styles';
import Box from '../Box';
import {collecting, errorcollecting} from '../../assets';
import {CollectingDataProps} from './typings';

// Collecting data component

const CollectingData: FC<CollectingDataProps> = ({status}): JSX.Element => {
  return (
    <View>
      <Box>
        {status === 'success' ? (
          <View style={styles.statusView}>
            <Image style={styles.imageView} source={collecting} />
            <Text style={styles.successText}>Collecting data...</Text>
          </View>
        ) : (
          <View style={styles.statusView}>
            <Image style={styles.imageView} source={errorcollecting} />
            <Text style={styles.errorText}>Not collecting data...</Text>
          </View>
        )}
      </Box>
    </View>
  );
};

export default CollectingData;
