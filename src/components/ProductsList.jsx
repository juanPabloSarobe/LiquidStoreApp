import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import ShadowPrimary from "./wrappers/ShadowPrimary";
import { AntDesign } from "@expo/vector-icons";
import fonts from "../utils/global/fonts";
import { useSelector } from "react-redux";

const ProductsList = ({
  item,
  screenWidth,
  navigation,
  closeSearchVisible,
}) => {
  const colors = useSelector((state) => state.colors);
  return (
    <>
      <ShadowPrimary
        style={[styles.container(colors), { width: screenWidth - 40 }]}
      >
        <Pressable
          style={styles.card}
          onPress={() => (
            navigation.navigate("ProductDetail", {
              productSelectedId: item.id,
            }),
            closeSearchVisible()
          )}
        >
          <Image style={styles.cardImg} source={{ uri: item.img }} />
          <View style={styles.cardContainer}>
            <Text style={styles.cardText(colors)}>{item.title}</Text>
            <Text style={styles.cardDescription(colors)}>
              {item.description}
            </Text>
            <View style={styles.cardIcons}>
              <View style={styles.cardIcon}>
                <AntDesign name="right" size={30} color={colors.textPrimary} />
              </View>
            </View>
          </View>
        </Pressable>
      </ShadowPrimary>
    </>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: (colors) => {
    return {
      height: 180,
      backgroundColor: colors.bgSecondary,
      borderRadius: 10,
      margin: 20,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  card: {
    height: "100%",
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "66%",
    height: "100%",
    borderRadius: 10,
  },
  cardImg: {
    height: "100%",
    width: "33%",
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: "white",
    resizeMode: "contain",
  },
  cardText: (colors) => {
    return {
      paddingTop: 5,
      marginLeft: 15,
      fontSize: 20,
      width: "66%",
      color: colors.textPrimary,
      flex: 3,
      fontFamily: fonts.robotoBold,
    };
  },
  cardDescription: (colors) => {
    return {
      fontSize: 16,
      color: colors.textSecondary,
      width: "90%",
      flex: 5,
      margin: 10,
      fontFamily: fonts.robotoItalic,
    };
  },
  cardIcons: {
    width: "100%",
    flex: 1,

    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  cardIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
});
