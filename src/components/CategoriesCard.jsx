import { Image, Pressable, StyleSheet, Text } from "react-native";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import ShadowPrimary from "./wrappers/ShadowPrimary";

const CategoriesCard = ({ item, navigation }) => {
  return (
    <ShadowPrimary style={styles.container}>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate("ProductsByCategory", { categorySelected: item })
        }
      >
        <Image style={styles.catImg} source={{ uri: item.img }} />
        <Text style={styles.catText}>{item.category}</Text>
      </Pressable>
    </ShadowPrimary>
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
    backgroundColor: "white",
    resizeMode: "contain",
    margin: 3,
  },
  catText: {
    marginLeft: 15,
    flex: 1,
    fontSize: 28,
    color: colors.textSecondary,
    fontFamily: fonts.robotoRegular,
  },
});
