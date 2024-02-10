import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

import products from "../utils/data/products.json";

const ProductsByCategory = ({ categorySelected, handleCategorySelected }) => {
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
      <Button onPress={() => handleCategorySelected("")} title="volver" />

      <FlatList
        data={productsByCategorySelected}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.description} </Text>}
      />
      {/* <Product categorySelected={categorySelected} /> */}
    </>
  );
};

export default ProductsByCategory;

const styles = StyleSheet.create({});
