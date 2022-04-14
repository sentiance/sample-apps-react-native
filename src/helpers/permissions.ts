import {Platform} from 'react-native';
import {
  checkLocationAccuracy,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  LocationAccuracy,
  request,
} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
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

    results = {
      ...states,
    };
  }
  return results;
};

export const getLocationStatus = (responsePermission: PermissionProps) => {
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
  } else {
    if (
      responsePermission[ACCESS_BACKGROUND_LOCATION] === 'granted' &&
      responsePermission[ACCESS_FINE_LOCATION] === 'granted'
    ) {
      return 'ALWAYS';
    } else if (
      responsePermission[ACCESS_BACKGROUND_LOCATION] === 'denied' &&
      responsePermission[ACCESS_FINE_LOCATION] === 'denied'
    ) {
      return 'DENIED';
    } else if (
      responsePermission[ACCESS_BACKGROUND_LOCATION] === 'denied' &&
      responsePermission[ACCESS_FINE_LOCATION] === 'granted'
    ) {
      return 'WHILE IN USE';
    } else {
      return 'NEVER';
    }
  }
};

export const getMotionStatus = (responsePermission: any) => {
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
  } else {
    if (responsePermission[ACTIVITY_RECOGNITION] === 'unavailable') {
      return 'UNAVAILABLE';
    } else if (responsePermission[ACTIVITY_RECOGNITION] === 'granted') {
      return 'ALWAYS';
    } else if (responsePermission[ACTIVITY_RECOGNITION] === 'denied') {
      return 'DENIED';
    } else if (responsePermission[ACTIVITY_RECOGNITION] === 'blocked') {
      return 'BLOCLED';
    } else {
      return 'NEVER';
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
