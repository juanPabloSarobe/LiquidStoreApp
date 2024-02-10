import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Home from "./src/screens/Home";
import ProductsByCategory from "./src/screens/ProductsByCategory";
import colors from "./src/utils/global/colors";
import { useFonts } from "expo-font";
import { fontFamily } from "./src/utils/global/fonts";

export default function App() {
  const [categorySelected, setCategorySelected] = useState("");
  const screenWidth = Dimensions.get("window").width;
  const handleCategorySelected = (cat) => {
    setCategorySelected(cat);
  };

  const [fontsLoaded, fontError] = useFonts(fontFamily);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  useEffect(() => {
    //console.log(categorySelected);
  }, [categorySelected]);

  return (
    <View style={styles.container}>
      {categorySelected ? (
        <ProductsByCategory
          categorySelected={categorySelected}
          handleCategorySelected={handleCategorySelected}
          screenWidth={screenWidth}
        />
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
