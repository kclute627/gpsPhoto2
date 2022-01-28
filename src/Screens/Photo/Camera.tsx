import React, {useEffect, useState, useRef} from 'react';
import {View, Pressable} from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useAnimatedProps,
  interpolate,
  useSharedValue,
  Easing,
  withTiming,
  Extrapolate,
} from 'react-native-reanimated';
import Geolocation from 'react-native-geolocation-service';
import {
  useCameraDevices,
  Camera as CameraComponent,
  useFrameProcessor
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/core';
import Loading from '../../Components/Loading/Loading';
import {styles} from './CameraStyles';
import {colors} from '../../theme';
import {useIsForeground} from '../../Hooks/hooks';
import {getCameraPermission, getLocation, getFullDate, BackButton} from './CameraFunctions';

import ImagePrev from './ImagePrev';

export default function Camera({navigation }: any) {

  const [opacity, setOpacity] = useState(1);
  const [camView, setCamView] = useState<'back' | 'front'>('back');
  const [loading, setLoading] = useState(false);



  //Permissions initial setup
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

  const spin = useAnimatedStyle<any>(() => ({
    transform: [
      {
        rotate: withTiming(`${spinValue.value}deg`, {
          duration: 950
        }),
      },
    ],
  }));
  const isActive = isForground && isFocused;

  

  //gps
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(false);
  const [locationDialog, setLocationDialog] = useState(true);

  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState(null);

  //photo
  const [image, setImage] = useState<null | string>(null);

  //Zoom Pinch to zoom
  const zoom = useSharedValue(0);

  const SCALE_FULL_ZOOM = 3;
  const MAX_ZOOM_FACTOR = 6;

  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
   
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);

  const ReanimatedCamera = Animated.createAnimatedComponent(CameraComponent);
  Animated.addWhitelistedNativeProps({
    zoom: true,
  });

  const onPinchGesture = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {startZoom?: number}
  >({
    onStart: (_, context) => {
   
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      
  
      const startZoom = context.startZoom || 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolate.CLAMP,
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP,
      );
    },
  });

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
        setImage={setImage}
      />
    );
  if (isFocused)
    return (
      <PinchGestureHandler onGestureEvent={onPinchGesture}>
        <ReanimatedCamera
          style={[styles.container]}
          device={device}
          ref={cameraRef}
          photo={true}
          enableZoomGesture={false}
          animatedProps={cameraAnimatedProps}
          isActive={isActive}>
          <Animated.View style={[styles.top, style]}></Animated.View>

          <View style={styles.middle}></View>
          <Animated.View style={[styles.bottom, style]}>
            <View style={{
              position: 'absolute',
              left: 19,
              
            }}>
              <BackButton navigation={navigation}/>
            </View>
            
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

            <View style={[styles.innerViewRight]}>
              <Pressable
                style={[styles.switchBtn]}
                disabled={!isActive}
                onPress={() => {
                  camView == 'back' ? setCamView('front') : setCamView('back');
                  spinValue.value === 180
                    ? (spinValue.value = 360)
                    : (spinValue.value = 180);
                    zoom.value = 1
                }}>
                <Animated.View style={spin}>
                  <Icon name="sync-outline" size={40} color={colors.white} />
                </Animated.View>
              </Pressable>
            </View>
          </Animated.View>
        </ReanimatedCamera>
      </PinchGestureHandler>
    );
}
