import { StyleSheet, Text, View } from "react-native";
import Categories from "../components/Categories";
import Header from "../components/Header";
import colors from "../utils/global/colors";

const Home = ({ handleCategorySelected, categorySelected }) => {
  return (
    <>
      <Header
        title={categorySelected ? categorySelected : "Tienda"}
        handleCategorySelected={handleCategorySelected}
      />
      <View style={styles.container}>
        <Categories handleCategorySelected={handleCategorySelected} />
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
