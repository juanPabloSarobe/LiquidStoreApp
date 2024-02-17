import { Image, StyleSheet, Text, View } from "react-native";
import Categories from "../components/Categories";
import Header from "../components/Header";
import colors from "../utils/global/colors";

const Home = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Categories navigation={navigation} />
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
