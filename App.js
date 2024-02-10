import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Home from "./src/screens/Home";
import ProductsByCategory from "./src/screens/ProductsByCategory";
import colors from "./src/utils/global/colors";
import { useFonts } from "expo-font";
import { fontFamily } from "./src/utils/global/fonts";
import ProductDetail from "./src/screens/ProductDetail";

export default function App() {
  const [categorySelected, setCategorySelected] = useState("");
  const [productSelectedId, setProductSelectedId] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const handleCategorySelected = (cat, id) => {
    setCategorySelected(cat);
    handleProductSelectedId(id);
  };

  const handleProductSelectedId = (id) => {
    setProductSelectedId(id);
  };

  const [fontsLoaded, fontError] = useFonts(fontFamily);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      {categorySelected ? (
        productSelectedId ? (
          <ProductDetail
            screenWidth={screenWidth}
            productSelectedId={productSelectedId}
            categorySelected={categorySelected}
            handleProductSelectedId={handleProductSelectedId}
            handleCategorySelected={handleCategorySelected}
          />
        ) : (
          <ProductsByCategory
            categorySelected={categorySelected}
            handleCategorySelected={handleCategorySelected}
            handleProductSelectedId={handleProductSelectedId}
            productSelectedId={productSelectedId}
            screenWidth={screenWidth}
          />
        )
      ) : (
        <Home
          handleCategorySelected={handleCategorySelected}
          categorySelected={categorySelected}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
});
