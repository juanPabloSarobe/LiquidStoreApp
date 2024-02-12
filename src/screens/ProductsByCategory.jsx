import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";

import products from "../utils/data/products.json";

const ProductsByCategory = ({
  categorySelected,
  handleCategorySelected,
  screenWidth,
  handleProductSelectedId,
  productSelectedId,
}) => {
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
    const primerFiltro = filterCategory(categorySelected);

    const filtroKeyword = primerFiltro.filter((prod) => {
      const titulo = prod.title.toLowerCase();

      return titulo.includes(searchText);
    });

    if (categorySelected) setproductsByCategorySelected(filtroKeyword);
  }, [categorySelected, searchText]);

  return (
    <>
      <Header
        title={categorySelected}
        handleCategorySelected={handleCategorySelected}
        productSelectedId={productSelectedId}
        handleProductSelectedId={handleProductSelectedId}
        handleSearchText={handleSearchText}
        searchText={searchText}
      />
      <View style={styles.container}>
        <FlatList
          data={productsByCategorySelected}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductsList
              item={item}
              screenWidth={screenWidth}
              handleProductSelectedId={handleProductSelectedId}
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
