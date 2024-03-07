import { FlatList, StyleSheet, View } from "react-native";
//import categories from "../utils/data/categories.json";
import colors from "../utils/global/colors";
import CategoriesCard from "./CategoriesCard";
import { useGetCategoriesQuery } from "../app/services/shop";

const Categories = ({ navigation }) => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <View style={styles.container}>
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
    backgroundColor: colors.bgPrimary,
    flex: 1,
    width: "100%",
  },
});
