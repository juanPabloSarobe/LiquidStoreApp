import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import colors from "../utils/global/colors";
import { AntDesign } from "@expo/vector-icons";
import fonts from "../utils/global/fonts";

const Header = ({ title, handleCategorySelected }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/liquidStoreLogo.png")}
      />
      <View style={styles.nav}>
        {title !== "Tienda" && (
          <Pressable
            style={styles.back}
            onPress={() => handleCategorySelected("")}
          >
            <AntDesign name="left" size={30} color={colors.textPrimary} />
          </Pressable>
        )}
        <View></View>
        <Text style={[styles.text]}>{title}</Text>
        <View></View>
        {title !== "Tienda" && <View style={styles.back}></View>}
      </View>
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
  nav: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: {
    marginHorizontal: 20,

    width: 30,
    height: 30,
  },
  text: {
    fontSize: 36,
    textAlignVertical: "top",
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    color: colors.textPrimary,
    fontFamily: fonts.robotoMedium,
  },
});
