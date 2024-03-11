import { Image, Pressable, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
//import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import ShadowPrimary from "./wrappers/ShadowPrimary";

const CategoriesCard = ({ item, navigation }) => {
  const colors = useSelector((state) => state.colors);
  return (
    <ShadowPrimary style={styles.container(colors)}>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate("ProductsByCategory", { categorySelected: item })
        }
      >
        <Image style={styles.catImg} source={{ uri: item.img }} />
        <Text style={styles.catText(colors)}>{item.category}</Text>
      </Pressable>
    </ShadowPrimary>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  container: (colors) => {
    return {
      height: 80,
      backgroundColor: colors.bgSecondary,
      borderRadius: 7,
      margin: 20,
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
    };
  },
  catImg: {
    height: 74,
    width: 74,
    borderRadius: 50,
    backgroundColor: "white",
    resizeMode: "contain",
    margin: 3,
  },
  catText: (colors) => {
    return {
      marginLeft: 15,
      flex: 1,
      fontSize: 28,
      color: colors.textSecondary,
      fontFamily: fonts.robotoRegular,
    };
  },
});
