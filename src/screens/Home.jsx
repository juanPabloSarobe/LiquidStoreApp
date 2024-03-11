import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";

const Home = ({ navigation }) => {
  const colors = useSelector((state) => state.colors);
  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
        <Categories navigation={navigation} />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
  },
});
