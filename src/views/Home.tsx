import React from 'react';
import {Button, Text, View} from 'react-native';
import axios from 'axios';
import contants from '../constants';
import Box from '../components/Box';

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
    <View>
      <Button
        title="Initialize SDK"
        onPress={() => handleButtonPress()}></Button>
      <Box marginBottom="none">
        <View>
          <Text>new screen</Text>
        </View>
      </Box>
    </View>
  );
};

export default Home;
