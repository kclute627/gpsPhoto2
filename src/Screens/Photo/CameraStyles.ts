import { StyleSheet } from "react-native";
import { colors, SCREEN_WIDTH } from "../../theme";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  top: {
    width: SCREEN_WIDTH,
    height: 100,
    backgroundColor: colors.darkBlue,

    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  middle: {
    flex: 1,
  },
  bottom: {
    width: SCREEN_WIDTH,
    height: 135,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },
  innerView: {},
  switchBtn: {
    height: 55,
    width: 55,
    borderRadius: 500,
    backgroundColor: 'rgba(235, 235, 235, 0.33)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 22,
  },
  innerViewRight: {
    position: 'absolute',
    right: 5,
  },
  camBtn: {
    height: 50,
    width: 50,
    backgroundColor: colors.white,
    borderRadius: 1000,
  },
  camBtnOutline: {
    height: 75,
    width: 75,
    borderRadius: 1000,
    borderColor: colors.white,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  middlePreview: {
    
    flex: 1,
  },
  latLngView: {
    position: 'absolute', 
    
    backgroundColor: 'rgba(59, 59, 59, 0.4)',

  },
  latText: {
    fontSize: 20,
    color: 'white',
  },
  previewBtnView:{
    
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  previewBtn: {
    color: colors.white,
    fontSize: 20,
    marginBottom: 20,
    
    
  }

});