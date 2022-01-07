import React from 'react';
import {View, Text, Image} from 'react-native';
import { styles } from './ImagePreviewStyles';

export default function ImagePrev({source}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: source}} />
    </View>
  );
}
