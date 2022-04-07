import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import CollectingData from '../../components/CollectingData';
import Box from '../../components/Box';
import InfoText from '../../components/InfoText';
import Badge from '../../components/Badge';
import TextView from '../../components/TextView';
import Button from '../../components/Button';
import RNSentiance from 'react-native-sentiance';
import {
  checkPermissions,
  getLocationStatus,
  getMotionStatus,
} from '../../helpers/permissions';

const Dashboard = () => {
  const [initState, setInitState] = useState('');
  const [initStatus, setInitStatus] = useState('');
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

  return (
    <ScrollView>
      <View style={styles.contentView}>
        <View style={styles.boxView}>
          <CollectingData
            status={
              initState === 'INITIALIZED' && initStatus === 'STARTED'
                ? 'success'
                : 'error'
            }
          />
          <Box>
            <Badge status={initState} title="Init status" />
            <View style={styles.divider} />
            <Badge status={initStatus} title="SDK status" />
          </Box>
          <Box>
            <InfoText title="User ID" text={userId} isCopyable={true} />
          </Box>
          <View style={{position: 'relative'}}>
            <Box>
              <Text style={styles.permissionHeadingText}>
                Permissions status
              </Text>
              <View style={styles.divider} />
              <TextView
                title="Location"
                status={getLocationStatus(responsePermission)}
              />
              <View style={styles.divider} />
              <TextView
                title="Motion"
                status={getMotionStatus(responsePermission)}
              />
              <View style={styles.divider} />
              {getLocationStatus(responsePermission) === 'ALWAYS' &&
              getMotionStatus(responsePermission) === 'ALWAYS' ? (
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
