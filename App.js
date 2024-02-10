import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home";
import ProductsByCategory from "./src/screens/ProductsByCategory";

export default function App() {
  const [categorySelected, setCategorySelected] = useState("");

  const handleCategorySelected = (cat) => {
    setCategorySelected(cat);
  };

  useEffect(() => {
    //console.log(categorySelected);
  }, [categorySelected]);

  return (
    <>
      {categorySelected ? (
        <ProductsByCategory
          categorySelected={categorySelected}
          handleCategorySelected={handleCategorySelected}
        />
      ) : (
        <Home
          handleCategorySelected={handleCategorySelected}
          categorySelected={categorySelected}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
