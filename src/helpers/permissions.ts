import {request, PERMISSIONS, check} from 'react-native-permissions';
import {Platform} from 'react-native';
import constants from '../constants';

const permissionRequest = async () => {
  const platform = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
  let locationPermission;

  if (platform === 'IOS') {
    await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    await request(PERMISSIONS.IOS.MOTION);
  } else {
    // ANDROID
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
  }
  return locationPermission;
};

const permissionCheck = async () => {
  const platform = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';

  const location = await check(
    platform === 'IOS'
      ? PERMISSIONS.IOS.LOCATION_ALWAYS
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );

  let backgroundLocation = constants.PERMISSION_GRANTED;

  if (platform === 'ANDROID') {
    backgroundLocation = await check(
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    );
  }

  const motion = await check(
    platform === 'IOS'
      ? PERMISSIONS.IOS.MOTION
      : PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
  );

  return {
    granted:
      location === constants.PERMISSION_GRANTED &&
      backgroundLocation === constants.PERMISSION_GRANTED &&
      (motion === constants.PERMISSION_GRANTED ||
        motion === constants.PERMISSION_UNAVAILABLE),
    permissions: {
      location:
        location === constants.PERMISSION_GRANTED &&
        backgroundLocation === constants.PERMISSION_GRANTED,
      motion:
        motion === constants.PERMISSION_GRANTED ||
        motion === constants.PERMISSION_UNAVAILABLE,
    },
  };
};

export {permissionCheck, permissionRequest};
