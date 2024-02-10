import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../utils/global/colors";

const CategoriesCard = ({ item, handleCategorySelected }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.container}
        onPress={() => handleCategorySelected(item.category)}
      >
        <Image style={styles.catImg} source={{ uri: item.img }} />
        <Text style={styles.catText}>{item.category}</Text>
      </Pressable>
    </View>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: colors.bgSecondary,
    borderRadius: 7,
    margin: 20,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  catImg: {
    height: 74,
    width: 74,
    borderRadius: 50,
    backgroundColor: colors.bgPrimary,
    resizeMode: "contain",
    margin: 3,
  },
  catText: {
    marginLeft: 15,
    flex: 1,
    fontSize: 28,
  },
});
