import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import fonts from "../utils/global/fonts";
import ShadowPrimary from "./wrappers/ShadowPrimary";
import QuantitySelectorCart from "./QuantitySelectorCart";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { removeItemFromCart } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const colors = useSelector((state) => state.colors);
  const screenWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const deleteItem = (item) => {
    Alert.alert(
      "Atención",
      `Esta seguro desea eliminar el producto 
${item.title} del carrito?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => dispatch(removeItemFromCart(item)) },
      ]
    );
  };

  return (
    <View style={styles.mainContainer(colors)}>
      <ShadowPrimary
        style={[styles.container(colors), { width: screenWidth - 40 }]}
      >
        <Image style={styles.cardImg} source={{ uri: item.img }} />
        <View style={styles.cardDetail}>
          <View style={styles.titleZone}>
            <Text
              style={styles.text(colors)}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {" "}
              {item.title}
            </Text>
            <Pressable
              style={styles.removeItem}
              onPress={() => deleteItem(item)}
            >
              <FontAwesome
                name="remove"
                size={25}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
          <Text style={styles.description(colors)}> {item.description}</Text>
          <Text style={styles.description(colors)}>Precio: {item.price}</Text>
          <View style={styles.priceZone}>
            <QuantitySelectorCart item={item} />
            <View style={styles.totalStyle}>
              <Text style={styles.price(colors)}>Total</Text>
              <Text style={styles.price(colors)}>
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
    width: "70%",
  },
  titleZone: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  text: (colors) => {
    return {
      fontFamily: fonts.robotoBold,
      color: colors.textPrimary,
      fontSize: 24,
    };
  },
  removeItem: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  description: (colors) => {
    return {
      color: colors.textPrimary,
      fontFamily: fonts.robotoItalic,
      fontSize: 18,
      flex: 3,
    };
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
  price: (colors) => {
    return {
      fontSize: 24,
      color: colors.textPrimary,
    };
  },
});
