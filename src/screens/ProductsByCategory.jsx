import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductsList from "../components/ProductsList";
import SearchBar from "../components/SearchBar";
import { Fontisto } from "@expo/vector-icons";
const screenWidth = Dimensions.get("window").width;

import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "../app/services/shop";
import IsLoading from "../components/IsLoading";
import { useSelector } from "react-redux";

const ProductsByCategory = ({ navigation, route }) => {
  const { categorySelected } = route.params;
  const colors = useSelector((state) => state.colors);
  const { data: products, isLoading: isLoadingProductsByCategory } =
    useGetProductsByCategoryQuery(categorySelected.category);
  const { data: allProducts, isLoading: isLoaingAllProducts } =
    useGetProductsQuery();

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
    if (categorySelected.category == "Todos") {
      setproductsByCategorySelected(allProducts);
    } else {
      setproductsByCategorySelected(products);
    }

    const filtroKeyword = productsByCategorySelected?.filter((prod) => {
      const titulo = prod.title.toLowerCase();

      return titulo.includes(searchText);
    });

    if (searchText) setproductsByCategorySelected(filtroKeyword);
  }, [categorySelected, searchText, products, allProducts]);

  return (
    <>
      <View style={styles.container(colors)}>
        <SearchBar
          isVisible={searchVisible}
          handleSearchText={handleSearchText}
          searchText={searchText}
        />

        {isLoadingProductsByCategory || isLoaingAllProducts ? (
          <IsLoading />
        ) : (
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
        )}
      </View>
    </>
  );
};

export default ProductsByCategory;

const styles = StyleSheet.create({
  container: (colors) => {
    return {
      flex: 1,
      backgroundColor: colors.bgPrimary,
    };
  },
});
