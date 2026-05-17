import { Linking, PermissionsAndroid } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { IS_IOS } from './Constants';

export async function requestLocationPermission() {
  if (IS_IOS) {
    return true;
  }

  try {
    const foreground = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (foreground === PermissionsAndroid.RESULTS.GRANTED) {
      const background = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );

      if (background === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      await Linking.openSettings();
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const checkLocationPermission = async (): Promise<boolean> => {
  if (IS_IOS) {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    );
    return granted;
  } catch (error) {
    console.error('Check Location Permission Error:', error);
    return false;
  }
};

export const requestNotificationPermission = async () => {
  if (IS_IOS) {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('iOS notification permission:', authStatus);
    }
  } else {
    await notifee.requestPermission();
  }
};
