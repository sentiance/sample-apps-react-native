import React, {useEffect, useState, useRef, FC} from 'react';
import {View, Text, ScrollView, AppState, DevSettings} from 'react-native';
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
  permissionLocationRequest,
  permissionMotionRequest,
  permissionText,
} from '../../helpers/permissions';
import {DashboardProps} from './typings';
import constants from '../../constants';

const Dashboard: FC<DashboardProps> = ({showHomeScreen}) => {
  const [initState, setInitState] = useState('');
  const [startStatus, setStartStatus] = useState('');
  const [userId, setUserId] = useState('');
  const [responsePermission, setResponsePermission] = useState<any>({});
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // reload page when open
    const subscription = AppState.addEventListener(
      'change',

      nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          DevSettings.reload();
        }

        appState.current = nextAppState;
      },
    );

    // Check for motion and location permissions
    async function checkAllPermission() {
      let response = await checkPermissions();
      setResponsePermission(response);
    }
    checkAllPermission();
    RNSentiance.getInitState().then(state => {
      setInitState(state);
    });
    RNSentiance.getSdkStatus().then(status => {
      setStartStatus(status.startStatus);
    });
    RNSentiance.getUserId().then(id => {
      setUserId(id);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.contentView}>
        <View style={styles.boxView}>
          <CollectingData
            status={
              initState === 'INITIALIZED' && startStatus === 'STARTED'
                ? 'success'
                : 'error'
            }
          />
          <Box>
            <Badge status={initState} title="Init status" />
            <View style={styles.divider} />
            <Badge status={startStatus} title="SDK status" />
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
                type="LOCATION"
                title="Location"
                status={getLocationStatus(responsePermission)}
              />
              <View style={styles.divider} />
              <TextView
                type="MOTION"
                title="Motion"
                status={getMotionStatus(responsePermission)}
              />
              <View style={styles.divider} />
              {getLocationStatus(responsePermission) ===
                constants.PERMISSION_GRANTED &&
              getMotionStatus(responsePermission) ===
                constants.PERMISSION_GRANTED ? (
                <Text style={styles.permissionText}>
                  All permissions provided
                </Text>
              ) : (
                <Text style={styles.permissionTextError}>
                  {permissionText(
                    getLocationStatus(responsePermission),
                    getMotionStatus(responsePermission),
                  )}
                </Text>
              )}
              {startStatus !== constants.STARTED && (
                <Button
                  type="hollow"
                  onClick={async () => {
                    await permissionLocationRequest();
                    permissionMotionRequest();
                  }}
                  text="Give Permissions"
                />
              )}
            </Box>
          </View>
          <View style={styles.buttonView}>
            <Button
              type="default"
              onClick={async () => {
                await RNSentiance.resetExperimental();
                showHomeScreen();
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
