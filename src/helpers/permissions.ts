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

// type PermissionStatus =
//   | 'denied'
//   | 'unavailable'
//   | 'granted'
//   | 'blocked'
//   | 'limited';

// export const permissionCheck = async () => {
//   const platform = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
//   const version = DeviceInfo.getSystemVersion();
//   const location = await check(
//     platform === 'IOS'
//       ? PERMISSIONS.IOS.LOCATION_ALWAYS
//       : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//   );
//   console.log('**********location', location);

//   let backgroundLocation: PermissionStatus = RESULTS.GRANTED;

//   if (parseInt(version) >= 10 && platform === 'ANDROID') {
//     backgroundLocation = await check(
//       PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
//     );
//   }

//   const motion = await check(
//     platform === 'IOS'
//       ? PERMISSIONS.IOS.MOTION
//       : PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
//   );

//   return {
//     granted:
//       location === RESULTS.GRANTED &&
//       backgroundLocation === RESULTS.GRANTED &&
//       (motion === RESULTS.GRANTED || motion === RESULTS.UNAVAILABLE),
//     permissions: {
//       location:
//         location === RESULTS.GRANTED && backgroundLocation === RESULTS.GRANTED,
//       motion: motion === RESULTS.GRANTED || motion === RESULTS.UNAVAILABLE,
//     },
//   };
// };

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
