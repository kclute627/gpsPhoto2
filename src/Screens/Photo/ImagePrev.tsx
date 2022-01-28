import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  PermissionsAndroid,
  Platform,
  Alert
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {captureRef} from 'react-native-view-shot';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {styles} from './CameraStyles';
import {
  GesturePropTypes,
  ImagePrevPropTypes,
  EventType,
} from '../../types/types';
import {EventType as EventType2} from 'react-native-gesture-handler/lib/typescript/EventType';

export default function ImagePrev({
  source,
  location,
  time,
  setImage,
}: ImagePrevPropTypes) {
  const [height, setHeight] = useState<null | string>(null);
  const [width, setWidth] = useState<null | string>(null);

  const x2 = useSharedValue(50);
  const y2 = useSharedValue(50);

  //Android Permissions
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  //Boundries
  const xBoundLeft = 10;
  const xBoundRight = width && parseInt(width) * 0.35;
  const yBoundTop = 10;
  const yBoundBottom = height && parseInt(height) * 0.84;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: GesturePropTypes) => {
      ctx.startX = x2.value;
      ctx.startY = y2.value;
    },
    onActive: (event, ctx) => {
      if (xBoundRight && x2.value >= xBoundLeft && x2.value <= xBoundRight) {
        x2.value = ctx.startX + event.translationX;
      }
      if (x2.value <= xBoundLeft) {
        x2.value = xBoundLeft;
      }
      if (xBoundRight && x2.value >= xBoundRight) {
        x2.value = xBoundRight;
      }

      if (yBoundBottom && y2.value >= yBoundTop && y2.value <= yBoundBottom) {
        y2.value = ctx.startY + event.translationY;
      }
      if (y2.value <= yBoundTop) {
        y2.value = yBoundTop;
      }
      if (yBoundBottom && y2.value >= yBoundBottom) {
        y2.value = yBoundBottom;
      }
    },
    onEnd: event => {},
  });

  const onLayout = (event: EventType | any) => {
    const {width, height} = event.nativeEvent.layout;

    setHeight(height);
    setWidth(width);
  };

  const animatedBox = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x2.value}, {translateY: y2.value}],
    };
  });

  const photoRef = useRef();

  const capturePhoto = async () => {
    try {
      const uri = await captureRef(photoRef, {
        format: 'jpg',
        quality: 0.8,
      });
      console.log(uri, 'uri');


      savePicture(uri)
      Alert.alert('Photo Saved');
      setImage(null)



    } catch (error) {
      console.log(error, 'error');
    }


  };

  async function savePicture(tag) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(tag, {type: 'photo', album: 'GPS'});
    
  }

  return (
    <View style={styles.imageContainer}>
      <Animated.View style={[styles.top]}></Animated.View>
      <View style={styles.middlePreview} onLayout={onLayout} ref={photoRef}>
        <Image style={{height: '100%', width: '100%'}} source={{uri: source}} />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.latLngView, animatedBox]}>
            <Text style={styles.latText}>Lat: {location?.coords.latitude}</Text>
            <Text style={styles.latText}>
              Lng: {location?.coords.longitude}
            </Text>
            <Text style={styles.latText}>{time}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>

      <Animated.View style={[styles.bottom]}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
          onPress={() => setImage(null)}>
          <Text style={styles.previewBtn}>Re-Take</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
          onPress={() => {
            capturePhoto();
          }}>
          <Text style={styles.previewBtn}>Keep</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
