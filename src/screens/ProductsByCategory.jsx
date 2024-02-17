import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
const screenWidth = Dimensions.get("window").width;

import products from "../utils/data/products.json";

const ProductsByCategory = ({ navigation, route }) => {
  const { categorySelected } = route.params;
  const [productsByCategorySelected, setproductsByCategorySelected] = useState(
    []
  );
  const [searchText, setSearchText] = useState("");

  const handleSearchText = (t) => {
    setSearchText(t.toLowerCase());
  };

  useEffect(() => {
    const filterCategory = (filter) => {
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

    if (categorySelected) setproductsByCategorySelected(primerFiltro);
  }, [categorySelected, searchText]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={productsByCategorySelected}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductsList
              item={item}
              screenWidth={screenWidth}
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
  },
});
