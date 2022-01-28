import React from 'react';
import {
  Linking,
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../../app.json';
import {Camera as CameraComponent} from 'react-native-vision-camera';
import {GetLocationProps} from '../../types/types';
import { styles } from '../Settings/SettingsStyles';
import { colors } from '../../theme';

export const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };

  const status = await Geolocation.requestAuthorization('whenInUse');
  if (status == 'granted') {
    return true;
  }
  if (status == 'denied') {
    Alert.alert('Location Permission Denied');
  }
  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

export const getCameraPermission = async () => {
  await CameraComponent.getCameraPermissionStatus();
  await CameraComponent.requestCameraPermission();
};

////////
export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

export const getLocation = async ({
  setLocation,
  highAccuracy,
  forceLocation,
  useLocationManager,
  locationDialog,
}: GetLocationProps) => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

  Geolocation.getCurrentPosition(
    position => {
      setLocation && setLocation(position);
    },
    error => {
      Alert.alert(`Code ${error.code}`, error.message);
      setLocation && setLocation(null);
      console.log(error);
    },
    {
      accuracy: {
        android: 'high',
        ios: 'best',
      },
      enableHighAccuracy: highAccuracy,
      timeout: 15000,
      maximumAge: 10000,
      distanceFilter: 0,
      forceRequestLocation: forceLocation,
      forceLocationManager: useLocationManager,
      showLocationDialog: locationDialog,
    },
  );
};

export const getFullDate = () => {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  let min = date.getMinutes();
  const sec = date.getUTCSeconds();

  if (min < 10) {
    min = parseInt(`0${min.toString()}`);

    console.log(min, 'min');
  }

  return `${month}/${day}/${year} ${hours}:${min}:${sec}`;
};

type backButtonTypes = {
  navigation: any,


  
}

export const BackButton = ({navigation}: backButtonTypes) => {
  return (
    <Pressable
      style={styles.backButton}
      onPress={() => navigation.navigate('Home')}>
      <Icon name={'arrow-back'} size={40} color={colors.white} />
    </Pressable>
  );
};
