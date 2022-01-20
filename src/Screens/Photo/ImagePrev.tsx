import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {styles} from './CameraStyles';
import {
  GesturePropTypes,
  ImagePrevPropTypes,
  EventType,
} from '../../types/types';
import { EventType as EventType2 } from 'react-native-gesture-handler/lib/typescript/EventType';

export default function ImagePrev({
  source,
  location,
  time,
}: ImagePrevPropTypes) {
  const [height, setHeight] = useState<null | string>(null);
  const [width, setWidth] = useState<null | string>(null);

  const x2 = useSharedValue(50);
  const y2 = useSharedValue(50);

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

      console.log({x2: x2.value, y2: y2.value});
    },
    onEnd: event => {},
  });

  const onLayout = (event: EventType | any) => {
    const {width, height} = event.nativeEvent.layout;

    setHeight(height);
    setWidth(width);
    console.log(width, height, 'size');
  };

  const animatedBox = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x2.value}, {translateY: y2.value}],
    };
  });

  return (
    <View style={styles.imageContainer}>
      <Animated.View style={[styles.top]}></Animated.View>
      <View style={styles.middlePreview} onLayout={onLayout}>
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

      <Animated.View style={[styles.bottom]}></Animated.View>
    </View>
  );
}
