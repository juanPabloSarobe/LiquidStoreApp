import { StyleSheet, Dimensions } from "react-native";
import colors from "./src/utils/global/colors";
import { useFonts } from "expo-font";
import { fontFamily } from "./src/utils/global/fonts";
import MainNavigator from "./src/routes/MainNavigator";

export default function App() {
  const screenWidth = Dimensions.get("window").width;

  const [fontsLoaded, fontError] = useFonts(fontFamily);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <MainNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
});

/*   <View style={styles.container}></View>; */
