import { StyleSheet, Text, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import { SlideInUp, SlideOutUp } from "react-native-reanimated";
import ShadowPrimary from "./wrappers/ShadowPrimary";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchBar = ({ isVisible, handleSearchText, searchText }) => {
  const [error, setError] = useState("");
  const colors = useSelector((state) => state.colors);
  useEffect(() => {
    const expression = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (expression.test(searchText)) {
      setError("Caracteres no validos");
      return;
    }
    setError("");
  }, [searchText]);

  return (
    <>
      {isVisible && (
        <ShadowPrimary>
          <Animated.View
            style={styles.container(colors)}
            entering={SlideInUp}
            exiting={SlideOutUp}
          >
            <TextInput
              style={styles.textInput(colors)}
              placeholder="buscar producto..."
              placeholderTextColor={colors.textSecondary}
              onChangeText={handleSearchText}
              value={searchText}
            ></TextInput>
          </Animated.View>
          {error && <Text>{error}</Text>}
        </ShadowPrimary>
      )}
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: (colors) => {
    return {
      backgroundColor: colors.bgSecondary,
      borderRadius: 15,
      marginVertical: 10,
      marginHorizontal: 7,
      padding: 10,
      paddingRight: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "96%",
    };
  },
  textInput: (colors) => {
    return {
      fontSize: 24,
      borderRadius: 5,
      color: colors.textPrimary,
      backgroundColor: colors.bgPrimary,
      flex: 1,
    };
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 5,
  },
  back: {
    marginHorizontal: 3,
    width: 30,
    height: 30,
  },
});
