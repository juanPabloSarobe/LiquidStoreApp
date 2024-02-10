import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import colors from "../utils/global/colors";

const Home = () => {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text>Hola mundo!!!</Text>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    alignItems: "center",
    // justifyContent: "center",
  },
});
