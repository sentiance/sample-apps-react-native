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
import {permissionCheck} from '../../helpers/permissions';

const Dashboard = () => {
  const [initState, setInitState] = useState('');
  const [initStatus, setInitStatus] = useState({});
  const [userId, setUserId] = useState('');
  const [locationStatus, setLocationStatus] = useState(false);
  const [motionStatus, setMotionStatus] = useState(false);

  useEffect(() => {
    permissionCheck().then(res => {
      setLocationStatus(res.permissions.location);
      setMotionStatus(res.permissions.motion);
    });

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
              <TextView
                title="Location"
                status={locationStatus ? 'success' : 'error'}
              />
              <View style={styles.divider} />
              <TextView
                title="Motion"
                status={motionStatus ? 'success' : 'error'}
              />
              <View style={styles.divider} />
              {motionStatus && locationStatus ? (
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
            <Button onClick={() => {}} text="Stop SDK" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
