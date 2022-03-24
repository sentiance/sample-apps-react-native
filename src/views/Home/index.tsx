import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import BoxButton from '../../components/BoxButton';
import styles from './styles';
import RNSentiance from 'react-native-sentiance';
import configData from '../../../config.json';

/**
 * Initializes the SDK
 *
 * The below method queries the sample "api" to fetch the
 * SDK credentials and initializes the Sentiance SDK
 */

type appConfigType = {
  appId: string;
  appSecret: string;
  sentianceApiBaseUrl: string;
};

const handleButtonPress = async (appConfig: appConfigType) => {
  const {appId, appSecret, sentianceApiBaseUrl: baseUrl} = appConfig;

  console.log('[sampleapp] pressed');
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
    await RNSentiance.start();
  } catch (error) {
    console.log(error);
  }
};

const linkUser = async (installId: string) => {
  await axios.post(
    `http://localhost:8000/users/${installId}/link`,
    {},
    {
      headers: {Authorization: 'Basic ZGV2LTE6dGVzdA=='},
    },
  );
};

const Home = () => {
  return (
    <View style={styles.contentView}>
      <View style={styles.helloTextView}>
        <Text style={styles.helloText}>Hello there!</Text>
        <Text>Please select your initialization method</Text>
      </View>

      <View style={styles.sdkBoxView}>
        <BoxButton
          title="Create User"
          onPress={() =>
            handleButtonPress({
              appId: configData.app.id,
              appSecret: configData.app.secret,
              sentianceApiBaseUrl: configData.sentiance_api_base_url,
            })
          }
        />
      </View>
    </View>
  );
};

export default Home;
