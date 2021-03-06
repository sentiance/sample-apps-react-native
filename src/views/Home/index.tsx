import React, {FC, useState} from 'react';
import {View, Text, Alert, LogBox} from 'react-native';
import axios from 'axios';
import BoxButton from '../../components/BoxButton';
import styles from './styles';
import RNSentiance from 'react-native-sentiance';
import constants from '../../constants';
import {HomeProps} from './typings';

const linkUser = async (installId: string) => {
  await axios.post(
    `${constants.BASE_URL}/users/${installId}/link`,
    {},
    {
      headers: {Authorization: 'Basic ZGV2LTE6dGVzdA=='},
    },
  );
};

const Home: FC<HomeProps> = ({showDashboardScreen}) => {
  const [loading, setLoading] = useState(false);

  const getCredentials = async () => {
    LogBox.ignoreAllLogs();
    console.log('Fetching credentials from the sample backend service');
    try {
      const response = await axios.get(`${constants.BASE_URL}/config`, {
        headers: {
          Authorization: 'Basic ZGV2LTE6dGVzdA==',
        },
      });
      return response.data;
    } catch (err) {
      console.log(`Error: ${err}`);
      Alert.alert(
        'Error:',
        'It seems that the sample backend service is not running.',
        [{text: 'OK', onPress: () => setLoading(false)}],
      );
      return;
    }
  };

  const handleCreateUser = async () => {
    setLoading(true);
    const baseUrl = constants.SENTIANCE_BASE_URL;
    const response = await getCredentials();
    const {id: appId, secret: appSecret} = response;
    try {
      await RNSentiance.createUserExperimental({
        credentials: {appId, appSecret, baseUrl},
        linker: async (data, done) => {
          try {
            // request your backend to perform user linking
            await linkUser(data.installId);
            // Ensure you call the "done" after
            done();
          } catch (err) {
            console.log(err);
          }
        },
      });
      try {
        await RNSentiance.start();
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
      showDashboardScreen();
    } catch (err) {
      console.log(err);
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
