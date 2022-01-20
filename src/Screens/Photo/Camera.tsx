import React, {useEffect, useState, useRef} from 'react';
import {View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import Geolocation from 'react-native-geolocation-service';
import {
  useCameraDevices,
  Camera as CameraComponent,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/core';
import Loading from '../../Components/Loading/Loading';
import {styles} from './CameraStyles';
import {colors} from '../../theme';
import {useIsForeground} from '../../Hooks/hooks';
import {getCameraPermission, getLocation, getFullDate} from './CameraFunctions';

import ImagePrev from './ImagePrev';

export default function Camera() {
  const [opacity, setOpacity] = useState(1);
  const [camView, setCamView] = useState<'back' | 'front'>('back');
  const [loading, setLoading] = useState(false);

  //gps
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(false);
  const [locationDialog, setLocationDialog] = useState(true);

  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState(null);

  //photo
  const [image, setImage] = useState<null | string>(null);

  //get GPS CORDS

  useEffect(() => {
    getLocation({
      setLocation,
      highAccuracy,
      forceLocation,
      useLocationManager,
      locationDialog,
    });
  }, []);

  //permissions and top and bottom transition
  useEffect(() => {
    getCameraPermission();

    setTimeout(() => {
      movingOpacity.value = 0.8;
    }, 600);
  }, []);

  const devices = useCameraDevices('wide-angle-camera');
  const device = camView === 'back' ? devices.back : devices.front;
  const isForground = useIsForeground();
  const isFocused = useIsFocused();
  const movingOpacity = useSharedValue(opacity);
  const spinValue = useSharedValue(180);
  const cameraRef = useRef<CameraComponent>(null);
  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(movingOpacity.value, {
        duration: 500,
      }),
    };
  });

  const spin = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(`${spinValue.value}deg`, {
          duration: 1000,
          easing: Easing.out(Easing.exp),
        }),
      },
    ],
  }));
  const isActive = isForground && isFocused;

  //Camera functions

  const takePhotoOptions = {
    photoCodec: 'jpeg',

    quality: 0.5,
    skipMetadata: true,
  };

  const takePhoto = async () => {
    setLoading(true);
    try {
      //Error Handle better
      if (cameraRef.current == null) throw new Error('Camera Ref is Null');

      const photo = await cameraRef.current.takePhoto(takePhotoOptions);

      setImage(photo.path);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (device == null || loading || !location) return <Loading />;
  if (image != null)
    return (
      <ImagePrev
        source={`file://${image}`}
        location={location}
        time={getFullDate()}
      />
    );
  if (isFocused)
    return (
      <CameraComponent
        style={[styles.container]}
        device={device}
        ref={cameraRef}
        photo={true}
        isActive={isActive}>
        <Animated.View style={[styles.top, style]}></Animated.View>

        <View style={styles.middle}></View>
        <Animated.View style={[styles.bottom, style]}>
          <View style={styles.innerView}>
            <Pressable
              disabled={!isActive}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
                styles.camBtnOutline,
              ]}
              onPress={() => takePhoto()}>
              <View style={styles.camBtn} />
            </Pressable>
          </View>

          <Animated.View style={[styles.innerViewRight]}>
            <Pressable
              style={[styles.switchBtn]}
              disabled={!isActive}
              onPress={() => {
                camView == 'back' ? setCamView('front') : setCamView('back');
                spinValue.value === 180
                  ? (spinValue.value = 360)
                  : (spinValue.value = 180);
              }}>
              <Animated.View style={spin}>
                <Icon name="sync-outline" size={40} color={colors.white} />
              </Animated.View>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </CameraComponent>
    );
}
