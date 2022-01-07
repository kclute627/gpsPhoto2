import React, {useCallback} from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './HomeStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {StackTypes} from '../../types/types';

type HomeBtnProps = {
  text: string;
  route: keyof StackTypes;
};

export default function Home() {

  const getOpacity = useCallback((pressed: boolean) => {
    return pressed ? 0.6 : 1;
  }, []);
  const _style = useCallback(
    ({pressed}) => [{opacity: getOpacity(pressed)}],
    [getOpacity],
  );
  const navigation = useNavigation<StackTypes>();
  const HomeBtn = ({text, route}: HomeBtnProps) => (
    <Pressable
      style={[styles.homeBtn]}
      onPress={() => navigation.navigate(route)}>
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Icon name="camera-outline" size={250} color={colors.gold} />
        <Text style={styles.topText}>GPS Photo</Text>
      </View>
      <View style={styles.middle}>
        <HomeBtn text="Take Photo" route="Camera" />
        <HomeBtn text="Settings" route="Settings" />
      </View>
    </View> 
  );
}
