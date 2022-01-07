import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue, 
    alignItems: "center",

     
  },
  top: {
      marginVertical: 35,
       
  },
  topText: {
      fontSize: 50,
      fontWeight: "bold",
      color: colors.white,
      alignSelf: "center"
  },
  middle:{

  },
  homeBtn: {
      height: 100,
      width: 300,
      alignContent: "center",
      alignItems: "center",
    justifyContent: 'center',
      backgroundColor: colors.lightBlue,
      marginVertical: 15,
      borderRadius: 15,
  },
  btnText: {
      color: colors.white,
      fontSize: 45
  }
});