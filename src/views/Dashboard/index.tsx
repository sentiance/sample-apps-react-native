import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Platform} from 'react-native';
import styles from './styles';
import CollectingData from '../../components/CollectingData';
import Box from '../../components/Box';
import InfoText from '../../components/InfoText';
import Badge from '../../components/Badge';
import TextView from '../../components/TextView';
import Button from '../../components/Button';
import RNSentiance from 'react-native-sentiance';
import {checkPermissions} from '../../helpers/permissions';
import {PERMISSIONS} from 'react-native-permissions';

const {
  ANDROID: {
    ACCESS_BACKGROUND_LOCATION,
    ACCESS_FINE_LOCATION,
    ACTIVITY_RECOGNITION,
  },
  IOS: {LOCATION_WHEN_IN_USE, LOCATION_ALWAYS, MOTION},
} = PERMISSIONS;

const Dashboard = () => {
  const [initState, setInitState] = useState('');
  const [initStatus, setInitStatus] = useState({});
  const [userId, setUserId] = useState('');
  const [responsePermission, setResponsePermission] = useState<any>({});

  useEffect(() => {
    async function checkAllPermission() {
      let response = await checkPermissions();
      setResponsePermission(response);
    }
    checkAllPermission();
    RNSentiance.getInitState().then(state => {
      setInitState(state);
    });
    RNSentiance.getSdkStatus().then(status => {
      setInitStatus(status.startStatus);
    });
    RNSentiance.getUserId().then(id => {
      setUserId(id);
    });
  }, []);

  const getLocationStatus = () => {
    if (Platform.OS === 'ios') {
      if (
        (responsePermission[LOCATION_ALWAYS] === 'denied' ||
          responsePermission[LOCATION_ALWAYS] === 'blocked') &&
        responsePermission[LOCATION_WHEN_IN_USE] === 'granted'
      ) {
        return 'WHILE IN USE';
      } else if (
        responsePermission[LOCATION_ALWAYS] === 'granted' &&
        (responsePermission[LOCATION_WHEN_IN_USE] === 'blocked' ||
          responsePermission[LOCATION_WHEN_IN_USE] === 'granted')
      ) {
        return 'ALWAYS';
      } else {
        return 'NEVER';
      }
    }
  };

  const getMotionStatus = () => {
    if (Platform.OS === 'ios') {
      if (responsePermission[MOTION] === 'unavailable') {
        return 'UNAVAILABLE';
      } else if (responsePermission[MOTION] === 'granted') {
        return 'ALWAYS';
      } else if (responsePermission[MOTION] === 'denied') {
        return 'DENIED';
      } else {
        return 'NEVER';
      }
    }
  };
  return (
    <ScrollView>
      <View style={styles.contentView}>
        {console.log(
          '*****statuschcek',
          getLocationStatus(),
          getMotionStatus(),
        )}
        <View style={styles.boxView}>
          <CollectingData status="success" />
          <Box>
            <Badge
              statusText={
                initState === 'INITIALIZED' ? 'Initialized' : 'Not-Initialized'
              }
              status={initState === 'INITIALIZED' ? 'success' : 'error'}
              title="Init status"
            />
            <View style={styles.divider} />
            <Badge
              statusText={initStatus === 'STARTED' ? 'Started' : 'Not-Started'}
              status={initStatus === 'STARTED' ? 'success' : 'error'}
              title="SDK status"
            />
          </Box>
          <Box>
            <InfoText title="User ID" text={userId} isCopyable={true} />
            <InfoText title="Install ID" text="6439jkbadk24928000ka001" />
            <InfoText
              title="External user ID (user linking)"
              text="6439jkbadk24928000ka001"
            />
          </Box>
          <View style={{position: 'relative'}}>
            <Box>
              <Text style={styles.permissionHeadingText}>
                Permissions status
              </Text>
              <View style={styles.divider} />
              <TextView title="Location" status={getLocationStatus()} />
              <View style={styles.divider} />
              <TextView title="Motion" status={getMotionStatus()} />
              <View style={styles.divider} />
              {getLocationStatus() === 'ALWAYS' &&
              getMotionStatus() === 'ALWAYS' ? (
                <Text style={styles.permissionText}>
                  All permissions provided
                </Text>
              ) : (
                <Text style={styles.permissionTextError}>
                  App will not work optimaly
                </Text>
              )}
            </Box>
          </View>
          <View style={styles.buttonView}>
            <Button
              onClick={async () => {
                await RNSentiance.resetExperimental();
              }}
              text="Stop SDK"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
