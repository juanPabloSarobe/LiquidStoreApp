import { StyleSheet, Dimensions, ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import { fontFamily } from "./src/utils/global/fonts";
import MainNavigator from "./src/routes/MainNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import IsLoading from "./src/components/IsLoading";

export default function App() {
  const screenWidth = Dimensions.get("window").width;

  const [fontsLoaded, fontError] = useFonts(fontFamily);

  if (!fontsLoaded && !fontError) {
    return (
      <>
        <IsLoading />
      </>
    );
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});

/*   <View style={styles.container}></View>; */
