import {Platform} from 'react-native';
import {
  checkLocationAccuracy,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  LocationAccuracy,
  request,
  openSettings,
} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import constants from '../constants';
const {
  ANDROID: {
    ACCESS_BACKGROUND_LOCATION,
    ACCESS_FINE_LOCATION,
    ACTIVITY_RECOGNITION,
  },
  IOS: {LOCATION_WHEN_IN_USE, LOCATION_ALWAYS, MOTION},
} = PERMISSIONS;

interface PermissionProps {
  'ios.permission.LOCATION_ALWAYS': string;
  'ios.permission.LOCATION_WHEN_IN_USE': string;
  'ios.permission.MOTION': string;
  'android.permission.ACCESS_BACKGROUND_LOCATION': string;
  'android.permission.ACCESS_FINE_LOCATION': string;
  'android.permission.ACTIVITY_RECOGNITION': string;
}
const version = DeviceInfo.getSystemVersion();
export const checkPermissions = async () => {
  let results;
  if (Platform.OS === 'ios') {
    const states = await checkMultiple([
      LOCATION_WHEN_IN_USE,
      LOCATION_ALWAYS,
      MOTION,
    ]);
    let locationAccuracy;
    if (states[LOCATION_ALWAYS] === RESULTS.GRANTED) {
      locationAccuracy = await checkLocationAccuracy();
    }
    if (
      states[LOCATION_ALWAYS] === RESULTS.BLOCKED ||
      states[MOTION] === RESULTS.BLOCKED
    ) {
      openSettings();
    }
    results = {
      ...states,
      locationAccuracy: locationAccuracy as LocationAccuracy,
    };
  } else {
    const states = await checkMultiple([
      ACCESS_BACKGROUND_LOCATION,
      ACCESS_FINE_LOCATION,
      ACTIVITY_RECOGNITION,
    ]);
    if (
      states[ACCESS_FINE_LOCATION] === RESULTS.BLOCKED ||
      states[ACTIVITY_RECOGNITION] === RESULTS.BLOCKED
    ) {
      openSettings;
    }

    results = {
      ...states,
    };
  }
  return results;
};

export const getLocationStatus = (responsePermission: PermissionProps) => {
  if (Platform.OS === 'ios') {
    if (responsePermission[LOCATION_ALWAYS] === constants.PERMISSION_DENIED) {
      return '';
    } else {
      return responsePermission[LOCATION_ALWAYS];
    }
  } else {
    if (
      responsePermission[ACCESS_FINE_LOCATION] === constants.PERMISSION_DENIED
    ) {
      return '';
    } else {
      return responsePermission[ACCESS_FINE_LOCATION];
    }
  }
};

export const getMotionStatus = (responsePermission: any) => {
  if (Platform.OS === 'ios') {
    if (responsePermission[MOTION] === constants.PERMISSION_DENIED) {
      return '';
    } else {
      return responsePermission[MOTION];
    }
  } else {
    if (
      responsePermission[ACTIVITY_RECOGNITION] === constants.PERMISSION_DENIED
    ) {
      return '';
    } else {
      return responsePermission[ACTIVITY_RECOGNITION];
    }
  }
};

// request permission for motion
export const permissionMotionRequest = async () => {
  if (Platform.OS === 'ios') {
    await request(PERMISSIONS.IOS.MOTION);
  } else {
    // ANDROID
    await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
  }
};

// request permission for location
export const permissionLocationRequest = async () => {
  if (Platform.OS === 'ios') {
    await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
  } else {
    // ANDROID
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (parseInt(version) >= 10) {
      await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
    }
  }
};

// permission grant status text
export const permissionText = (
  locationStatus: string,
  motionStatus: string,
) => {
  if (locationStatus === 'denied' && motionStatus === 'denied') {
    return 'Grant permissions to start SDK';
  } else {
    return 'Please provide “Always”  permission';
  }
};
