import "react-native-gesture-handler";
import { StyleSheet, Dimensions, ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import { fontFamily } from "./src/utils/global/fonts";
import MainNavigator from "./src/routes/MainNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import IsLoading from "./src/components/IsLoading";
import { eraseTable, init } from "./src/utils/db";
import { RootSiblingParent } from "react-native-root-siblings";

//eraseTable();
init();
export default function App() {
  const screenWidth = Dimensions.get("window").width;

  const [fontsLoaded, fontError] = useFonts(fontFamily);

  if (!fontsLoaded && !fontError) {
    return (
      <>
        <Provider store={store}>
          <IsLoading />
        </Provider>
      </>
    );
  }

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <MainNavigator />
      </RootSiblingParent>
    </Provider>
  );
}

const styles = StyleSheet.create({});

/*   <View style={styles.container}></View>; */
