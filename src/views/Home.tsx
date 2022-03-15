import React from 'react';
import {View} from 'react-native';
import axios from 'axios';
import contants from '../constants';
import Box from '../components/Box';
import Badge from '../components/Badge';
import Button from '../components/Button';

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
      <Box>
        <View>
          <Badge
            title="Init Status"
            status="error"
            statusText="Not Initialized"
          />
        </View>
      </Box>
      <Button
        text="Initialize SDK"
        onClick={() => handleButtonPress()}></Button>
    </View>
  );
};

export default Home;
