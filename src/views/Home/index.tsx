import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import contants from '../../constants';
import Box from '../../components/Box';
import styles from './styles';
import {attach, forward} from '../../assets';

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
        <Box>
          <View style={styles.boxView}>
            <Image style={styles.imageView} source={attach} />
            <TouchableOpacity onPress={() => handleButtonPress()}>
              <View style={styles.bottomView}>
                <Text>Create User</Text>
                <Image style={styles.forwardImage} source={forward} />
              </View>
            </TouchableOpacity>
          </View>
        </Box>
      </View>
    </View>
  );
};

export default Home;
