import {StyleSheet} from 'react-native';
import {colors} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  headerView: {
    height: 225,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: colors.gold,
  },
  middle: {
    alignItems: 'flex-start',
    flex: .71,
  },
  switchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
    paddingLeft: 45,
    paddingRight: 45,
  },
  switchText: {
    fontSize: 25,
    color: colors.white,
    justifyContent: 'flex-start',
  },
  switch: {
    alignSelf: 'flex-end',
  },
  backButton: {
    height: 55,
    width: 55,
    backgroundColor: '#bdbcbc5c',
    borderRadius: 100,
    

    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
      height: 55,
      width: 125,
      padding: 7,
      backgroundColor: '#ffffff',
      borderRadius: 15,
      fontSize: 20
  },
  saveBtn: {
      height: 100,
      width: 250,
      backgroundColor: colors.lightBlue,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25
  },
  saveText: {
      color: colors.white,
      fontSize: 30,

  },
  btnView: {
      alignSelf: 'center',
      marginTop: 25,
  }
});
