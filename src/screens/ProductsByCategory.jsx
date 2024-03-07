import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import ProductsList from "../components/ProductsList";
import SearchBar from "../components/SearchBar";
import { Fontisto } from "@expo/vector-icons";
const screenWidth = Dimensions.get("window").width;

//import products from "../utils/data/products.json";
import colors from "../utils/global/colors";
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "../app/services/shop";

const ProductsByCategory = ({ navigation, route }) => {
  const { categorySelected } = route.params;
  console.log(categorySelected.category);
  const { data: products } = useGetProductsByCategoryQuery(
    categorySelected.category
  );
  console.log(products);

  const [searchVisible, setSearchVisible] = useState(false);
  const [productsByCategorySelected, setproductsByCategorySelected] = useState(
    []
  );
  const [searchText, setSearchText] = useState("");

  const handleSearchVisible = () => {
    setSearchVisible(!searchVisible);
  };
  const closeSearchVisible = () => {
    setSearchVisible(false);
    handleSearchText("");
  };

  const handleSearchText = (t) => {
    setSearchText(t.toLowerCase());
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: categorySelected.category,
      headerRight: () =>
        !searchVisible ? (
          <Pressable style={styles.back} onPress={handleSearchVisible}>
            <Fontisto name="search" size={25} color={colors.textPrimary} />
          </Pressable>
        ) : (
          <Pressable style={styles.back} onPress={closeSearchVisible}>
            <Fontisto name="close-a" size={20} color={colors.textPrimary} />
          </Pressable>
        ),
    });
  }, [searchVisible]);

  useEffect(() => {
    setproductsByCategorySelected(products);
    /*  const filterCategory = (filter) => {
      if (filter === "Todos") return products;
      else {
        return products.filter((product) => product.category === filter);
      }
    };
    const primerFiltro = filterCategory(categorySelected.category);

    const filtroKeyword = primerFiltro.filter((prod) => {
      const titulo = prod.title.toLowerCase();

      return titulo.includes(searchText);
    });

    if (categorySelected) setproductsByCategorySelected(filtroKeyword); */
  }, [categorySelected, searchText, products]);

  return (
    <>
      <View style={styles.container}>
        <SearchBar
          isVisible={searchVisible}
          handleSearchText={handleSearchText}
          searchText={searchText}
        />
        <FlatList
          data={productsByCategorySelected}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductsList
              item={item}
              screenWidth={screenWidth}
              closeSearchVisible={closeSearchVisible}
              navigation={navigation}
            />
          )}
        />
      </View>
    </>
  );
};

export default ProductsByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
});
