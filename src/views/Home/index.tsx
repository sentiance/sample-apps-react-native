import React, {FC, useState} from 'react';
import {View, Text, Alert, LogBox} from 'react-native';
import axios from 'axios';
import BoxButton from '../../components/BoxButton';
import styles from './styles';
import SentianceCore from '@sentiance-react-native/core';
import constants from '../../constants';
import {HomeProps} from './typings';

const requestAuthCode = async () => {
  console.log('Fetching auth code from the sample backend service');
  return await axios.get(`${constants.BASE_URL}/auth/code`, {}, {});
};

const Home: FC<HomeProps> = ({showDashboardScreen}) => {
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const authCodeResponse = await requestAuthCode();
      const {auth_code: authCode} = authCodeResponse.data;
      const createUserResult = await SentianceCore.createUser({
        authCode
      });
      console.log(
        'Created a new user with the following ID: ' , createUserResult.userInfo.userId
      );

      try {
        const result = await SentianceCore.enableDetections();
        console.log('Detections are now ' + result.detectionStatus);
      } catch (err) {
        console.log(err.code);
      }
      setLoading(false);
      showDashboardScreen();
    } catch (err) {
      console.log("error:" + err.code + " " + "message: " + err.message);
      setLoading(false);
      Alert.alert(`Error: ${err}`);
    }
  };
  return (
    <View style={styles.contentView}>
      <View style={styles.helloTextView}>
        <Text style={styles.helloText}>Hello there!</Text>
      </View>
      <BoxButton
        inactive={loading}
        onPress={() => handleCreateUser()}
        title="Create SDK User"
      />
    </View>
  );
};

export default Home;
