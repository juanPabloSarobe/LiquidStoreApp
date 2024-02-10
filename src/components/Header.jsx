import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import React from "react";
import colors from "../utils/global/colors";

const Header = ({ title = "Tienda" }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../../assets/liquidStoreLogo.png")}
        />
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgSecondary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    maxWidth: "35%",
    maxHeight: 120,
    height: 50,

    resizeMode: "contain",
  },
  text: {
    fontSize: 36,
    justifyContent: "flex-start",
    textAlignVertical: "top",
    marginBottom: 10,
  },
});
