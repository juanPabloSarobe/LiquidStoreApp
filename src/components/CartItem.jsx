import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
} from "react-native";
import React from "react";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import ShadowPrimary from "./wrappers/ShadowPrimary";
import QuantitySelector from "./QuantitySelector";

const CartItem = ({ item }) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.mainContainer}>
      <ShadowPrimary style={[styles.container, { width: screenWidth - 40 }]}>
        <Image style={styles.cardImg} source={{ uri: item.img }} />
        <View style={styles.cardDetail}>
          <Text style={styles.text}> {item.title}</Text>
          <Text style={styles.description}> {item.description}</Text>
          <Text style={styles.description}>Precio: {item.price}</Text>
          <View style={styles.priceZone}>
            <QuantitySelector item={item} />
            <View style={styles.totalStyle}>
              <Text style={styles.price}>Total</Text>
              <Text style={styles.price}>
                {Math.round(item.price * item.quantity * 100) / 100}
              </Text>
            </View>
          </View>
        </View>
      </ShadowPrimary>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
    height: "100%",
  },
  container: {
    flexDirection: "row",
    height: 200,
    margin: 20,
    backgroundColor: colors.bgSecondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cardImg: {
    height: "100%",
    width: "30%",
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cardDetail: {
    flex: 1,
    padding: 7,
  },
  text: {
    fontFamily: fonts.robotoBold,
    color: colors.textPrimary,
    fontSize: 24,
    flex: 2,
  },
  description: {
    color: colors.textPrimary,
    fontFamily: fonts.robotoItalic,
    fontSize: 18,
    flex: 3,
  },
  totalStyle: {
    flexDirection: "column",
  },
  priceZone: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  price: {
    fontSize: 24,
    color: colors.textPrimary,
  },
});
