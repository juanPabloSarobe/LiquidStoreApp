import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../utils/global/colors";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import fonts from "../utils/global/fonts";
import SearchBar from "./SearchBar";

const Header = ({
  title,
  handleCategorySelected,
  productSelectedId,
  handleProductSelectedId,
  handleSearchText,
  searchText,
}) => {
  const path = () => {
    if (!productSelectedId) {
      return "";
    } else {
      handleProductSelectedId(0);
      closeSearchVisible;
      return title;
    }
  };

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchIconVisible, setSearchIconVisible] = useState(false);
  const [closeIconVisible, setcloseIconVisible] = useState(false);

  useEffect(() => {
    if (title == "Tienda") {
      setSearchIconVisible(false);
    } else if (productSelectedId) {
      setSearchIconVisible(false);
    } else {
      setSearchIconVisible(true);
    }
  }, [productSelectedId, title]);

  const handleSearchVisible = () => {
    setSearchVisible(!searchVisible);
    setcloseIconVisible(!searchVisible);
  };
  const closeSearchVisible = () => {
    setSearchVisible(false);
    setcloseIconVisible(false);
    handleSearchText("");
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/liquidStoreLogo.png")}
        />
        <View style={styles.nav}>
          {title !== "Tienda" && (
            <Pressable
              style={styles.back}
              onPress={() => handleCategorySelected(path)}
            >
              <AntDesign name="left" size={30} color={colors.textPrimary} />
            </Pressable>
          )}
          <View></View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text]}>
            {title}
          </Text>
          <View></View>

          {title !== "Tienda" && !searchIconVisible && (
            <View style={styles.back}></View>
          )}

          {searchIconVisible && !searchVisible && (
            <Pressable style={styles.back} onPress={handleSearchVisible}>
              <Fontisto name="search" size={30} color={colors.textPrimary} />
            </Pressable>
          )}
          {title !== "Tienda" && closeIconVisible && (
            <Pressable style={styles.back} onPress={closeSearchVisible}>
              <Fontisto name="close-a" size={30} color={colors.textPrimary} />
            </Pressable>
          )}
        </View>
      </View>

      <SearchBar
        isVisible={searchVisible}
        style={styles.search}
        handleSearchText={handleSearchText}
        searchText={searchText}
      />
    </>
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
    zIndex: 12,
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
    width: "65%",
    textAlign: "center",
  },
  search: {
    width: "10%",
    zIndex: 10,
  },
});
