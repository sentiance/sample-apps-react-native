import React, {FC} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import BoxButton from '../../components/BoxButton';
import styles from './styles';
import RNSentiance from 'react-native-sentiance';
import constants from '../../constants';
import {HomeProps} from './typings';

/**
 * Initializes the SDK
 *
 * The below method queries the sample "api" to fetch the
 * SDK credentials and initializes the Sentiance SDK
 */

const getCredentials = async () => {
  try {
    const response = await axios.get(`${constants.BASE_URL}/config`, {
      headers: {
        Authorization: 'Basic ZGV2LTE6dGVzdA==',
      },
    });
    return response.data;
  } catch (err) {
    console.log('err---', err);
  }
};
const handleCreateUser = async (updateScreen: () => void) => {
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
          updateScreen();
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
    `${constants.BASE_URL}/users/${installId}/link`,
    {},
    {
      headers: {Authorization: 'Basic ZGV2LTE6dGVzdA=='},
    },
  );
};

const Home: FC<HomeProps> = ({updateScreen}) => {
  return (
    <View style={styles.contentView}>
      <View style={styles.helloTextView}>
        <Text style={styles.helloText}>Hello there!</Text>
        <Text>Please select your initialization method</Text>
      </View>

      <View style={styles.sdkBoxView}>
        <BoxButton
          title="Create User"
          onPress={() => handleCreateUser(updateScreen)}
        />
      </View>
    </View>
  );
};

export default Home;
