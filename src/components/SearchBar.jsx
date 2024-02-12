import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { SlideInUp, SlideOutUp } from "react-native-reanimated";
import colors from "../utils/global/colors";
import ShadowPrimary from "./wrappers/ShadowPrimary";
import { Fontisto, Feather } from "@expo/vector-icons";

// return <Animated.View entering={FadeIn} exiting={FadeOut} />;

const SearchBar = ({ isVisible, handleSearchText, searchText }) => {
  return (
    <>
      {isVisible && (
        <ShadowPrimary>
          <Animated.View
            style={styles.container}
            entering={SlideInUp}
            exiting={SlideOutUp}
          >
            <TextInput
              style={styles.textInput}
              placeholder="buscar producto..."
              onChangeText={handleSearchText}
              value={searchText}
            ></TextInput>
            {/* <View style={styles.buttons}>
              <Pressable style={styles.back}>
                <Fontisto name="search" size={30} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={styles.back}>
                <Feather name="trash" size={30} color={colors.textPrimary} />
              </Pressable>
            </View> */}
          </Animated.View>
        </ShadowPrimary>
      )}
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
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
  },
  textInput: {
    fontSize: 24,
    borderRadius: 5,
    color: colors.textPrimary,
    backgroundColor: colors.bgPrimary,
    flex: 1,
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
