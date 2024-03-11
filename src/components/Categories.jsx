import { FlatList, StyleSheet, View } from "react-native";
//import categories from "../utils/data/categories.json";
//import colors from "../utils/global/colors";
import CategoriesCard from "./CategoriesCard";
import { useGetCategoriesQuery } from "../app/services/shop";
import { useSelector } from "react-redux";

const Categories = ({ navigation }) => {
  const { data: categories } = useGetCategoriesQuery();
  const colors = useSelector((state) => state.colors);
  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoriesCard item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
