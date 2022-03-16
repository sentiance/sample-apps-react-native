import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import contants from '../../constants';
import BoxButton from '../../components/BoxButton';
import styles from './styles';

/**
 * Initializes the SDK
 *
 * The below method queries the sample "api" to fetch the
 * SDK credentials and initializes the Sentiance SDK
 */
const handleButtonPress = async () => {
  console.log('[sampleapp] pressed');

  const response = await axios.get(`${contants.BASE_URL}/config`, {
    headers: {
      Authorization: 'Basic ZGV2LTE6dGVzdA==',
    },
  });

  console.log(response.data);
};

const Home = () => {
  return (
    <View style={styles.contentView}>
      <View style={styles.helloTextView}>
        <Text style={styles.helloText}>Hello there!</Text>
        <Text>Please select your initialization method</Text>
      </View>

      <View style={styles.sdkBoxView}>
        <BoxButton title="Create User" onPress={() => handleButtonPress()} />
      </View>
    </View>
  );
};

export default Home;
