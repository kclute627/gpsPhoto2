import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Switch, TextInput} from 'react-native-gesture-handler';
import {styles} from './SettingsStyles';
import {BackButton} from '../Photo/CameraFunctions';
import {colors} from '../../theme';

export default function Settings({navigation}: any) {
  //set up with context api
  const [vibration, setVibration] = useState(true);
  const [sound, setSound] = useState(true);
  const [customText, setCustomText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.switchView}>
          <Text style={styles.switchText}>Vibration</Text>
          <Switch
            value={vibration}
            onValueChange={() => setVibration(current => !current)}
          />
        </View>
        <View style={styles.switchView}>
          <Text style={styles.switchText}>Sound</Text>
          <Switch
            style={styles.switch}
            value={sound}
            onValueChange={() => setSound(current => !current)}
          />
        </View>
        <View style={styles.switchView}>
          <Text style={styles.switchText}>Custom Text</Text>
          <TextInput
            style={styles.textInput}
            value={customText}
            maxLength={25}
            onChangeText={e => setCustomText(e)}
          />
        </View>
        <View style={styles.btnView}>
          <Pressable
            style={styles.saveBtn}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </View>
      </View>
      <View style={{marginLeft: 15}}>
          <BackButton navigation={navigation} />
      </View>
      
    </View>
  );
}
