import {Platform} from 'react-native';
import {
  checkLocationAccuracy,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  LocationAccuracy,
  // check,
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

export const getLocationStatus = (responsePermission: any) => {
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
  }
};

export const permissionRequest = async () => {
  const version = DeviceInfo.getSystemVersion();

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
