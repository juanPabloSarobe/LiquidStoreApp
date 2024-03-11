import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../utils/global/fonts";
import { useSelector } from "react-redux";

const OrderItemProduct = ({ navigation, item }) => {
  const colors = useSelector((state) => state.colors);
  return (
    <View style={styles.mainContainer(colors)}>
      <View style={styles.detail}>
        <Image style={styles.catImg} source={{ uri: item.img }} />
        <View style={styles.unitsZone}>
          <Text style={styles.quantityText(colors)}>{item.quantity} x</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.text(colors)}
          >
            {item.title}
          </Text>
        </View>
        <Text style={styles.text(colors)}>
          ${Math.round(item.price * item.quantity * 100) / 100}
        </Text>
      </View>
    </View>
  );
};

export default OrderItemProduct;

const styles = StyleSheet.create({
  mainContainer: (colors) => {
    return {
      flex: 1,
      backgroundColor: colors.bgSecondary,
      height: "100%",
    };
  },
  container: (colors) => {
    return {
      flexDirection: "row",
      height: 200,
      margin: 20,
      backgroundColor: colors.bgSecondary,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
    };
  },
  catImg: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: "white",
    resizeMode: "contain",
    margin: 3,
  },
  unitsZone: {
    flexDirection: "row",
    flexGrow: 1,
    width: 200,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: (colors) => {
    return {
      fontFamily: fonts.robotoBold,
      color: colors.textPrimary,
      fontSize: 22,
      marginRight: 10,
    };
  },
  quantityText: (colors) => {
    return {
      fontFamily: fonts.robotoBold,
      color: colors.textPrimary,
      fontSize: 22,
      marginHorizontal: 5,
    };
  },
});
