import React, {useEffect, useState, useRef, FC} from 'react';
import {View, Text, ScrollView, AppState, DevSettings} from 'react-native';
import styles from './styles';
import CollectingData from '../../components/CollectingData';
import Box from '../../components/Box';
import InfoText from '../../components/InfoText';
import Badge from '../../components/Badge';
import TextView from '../../components/TextView';
import Button from '../../components/Button';
import SentianceCore from '@sentiance-react-native/core';
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
import {openSettings} from 'react-native-permissions';

const Dashboard: FC<DashboardProps> = ({showHomeScreen}) => {
  const [initState, setInitState] = useState('');
  const [detectionStatus, setDetectionStatus] = useState('');
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
    SentianceCore.getInitState().then((state: any) => {
      setInitState(state);
    });
    SentianceCore.getSdkStatus().then((status: any) => {
      setDetectionStatus(status.detectionStatus);
    });
    SentianceCore.getUserId().then((id: any) => {
      setUserId(id);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const openPermissions = async () => {
    if (!getLocationStatus(responsePermission)) {
      await permissionLocationRequest();
      permissionMotionRequest();
    } else {
      openSettings();
    }
  };

  return (
    <ScrollView>
      <View style={styles.contentView}>
        <View style={styles.boxView}>
          <CollectingData
            status={
              initState === 'INITIALIZED' &&
              detectionStatus === constants.ENABLED_AND_DETECTING
                ? 'success'
                : 'error'
            }
          />
          <Box>
            <Badge status={initState} title="Init status" />
            <View style={styles.divider} />
            <Badge status={detectionStatus} title="Detection status" />
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
              {detectionStatus !== constants.ENABLED_AND_DETECTING && (
                <Button
                  type="hollow"
                  onClick={openPermissions}
                  text="Give Permissions"
                />
              )}
            </Box>
          </View>
          <View style={styles.buttonView}>
            <Button
              type="default"
              onClick={async () => {
                await SentianceCore.reset();
                showHomeScreen();
              }}
              text="Reset SDK"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
