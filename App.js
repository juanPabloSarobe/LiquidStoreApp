import { StyleSheet, Dimensions, ActivityIndicator, View } from "react-native";
import colors from "./src/utils/global/colors";
import { useFonts } from "expo-font";
import { fontFamily } from "./src/utils/global/fonts";
import MainNavigator from "./src/routes/MainNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";

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

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    justifyContent: "center",
  },
});

/*   <View style={styles.container}></View>; */
