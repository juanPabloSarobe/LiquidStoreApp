import { StyleSheet, Dimensions, ActivityIndicator, View } from "react-native";
import colors from "./src/utils/global/colors";
import { useFonts } from "expo-font";
import { fontFamily } from "./src/utils/global/fonts";
import MainNavigator from "./src/routes/MainNavigator";

export default function App() {
  const screenWidth = Dimensions.get("window").width;

  const [fontsLoaded, fontError] = useFonts(fontFamily);

  if (!fontsLoaded && !fontError) {
    return (
      <>
        <View style={styles.container}>
          <ActivityIndicator size={50} color={colors.textPrimary} />
        </View>
      </>
    );
  }

  return <MainNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    justifyContent: "center",
  },
});

/*   <View style={styles.container}></View>; */
