import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";

import products from "../utils/data/products.json";

const ProductsByCategory = ({
  categorySelected,
  handleCategorySelected,
  screenWidth,
}) => {
  const [productsByCategorySelected, setproductsByCategorySelected] = useState(
    []
  );

  useEffect(() => {
    const filterCategory = (filter) => {
      if (filter === "Todos") return products;
      else {
        return products.filter((product) => product.category === filter);
      }
    };

    if (categorySelected)
      setproductsByCategorySelected(filterCategory(categorySelected));
  }, [categorySelected]);

  return (
    <>
      <Header
        title={categorySelected}
        handleCategorySelected={handleCategorySelected}
      />
      <View style={styles.container}>
        <FlatList
          data={productsByCategorySelected}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductsList
              categorySelected={categorySelected}
              item={item}
              screenWidth={screenWidth}
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
