import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../utils/global/colors";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import fonts from "../utils/global/fonts";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllitems, buyCart } from "../features/cart/cartSlice";
import { usePostOrderMutation } from "../app/services/shop";
import { UseSelector } from "react-redux";

const CartList = ({ navigation }) => {
  const user = useSelector((state) => state.counter);
  const cart = useSelector((state) => state.cart);
  const emptyCart = cart.quantityTotal > 0 ? false : true;
  const dispatch = useDispatch();
  const [triggerPost, result] = usePostOrderMutation();
  const deleteCart = () => {
    Alert.alert(
      "Atención",
      `Seguro desea eliminar el carrito? 
Esta accion no se podra deshacer`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => dispatch(deleteAllitems()) },
      ]
    );
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        !emptyCart && (
          <Pressable style={styles.back} onPress={deleteCart}>
            <FontAwesome name="trash" size={25} color={colors.textSecondary} />
          </Pressable>
        ),
    });
    if (cart.buyed == true) {
      triggerPost({ ...cart, user: user.localId });
      dispatch(deleteAllitems());
    }
  }, [cart]);
  const confirmCart = () => {
    if (!user.idToken) {
      Alert.alert("Atención", `Debe estar logueado para hacer una compra`, [
        { text: "Cancel", style: "cancel" },
        { text: "login", onPress: () => navigation.navigate("Login") },
      ]);
    } else {
      dispatch(buyCart());
      navigation.navigate("Orders");
    }
  };
  if (emptyCart) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Su carrito se encuentra vacio</Text>
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={styles.flatStyle}
          data={cart.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItem item={item} navigation={navigation} />
          )}
        />
      </View>
      <View style={styles.buyZone}>
        <View style={styles.buyTotal}>
          <Text style={styles.buyTotalLabel}>Total: $</Text>
          <Text style={styles.buyPrice}> {cart.total}</Text>
        </View>
        <Pressable style={styles.buyButton} onPress={() => confirmCart()}>
          <Text style={styles.buyButtonText}>Finalizar compra</Text>
        </Pressable>
      </View>
    </>
  );
};

export default CartList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgPrimary,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  flatStyle: {
    flex: 1,
    height: "100%",
  },
  text: {
    textAlign: "center",
    fontSize: 32,
    color: colors.textSecondary,
    marginHorizontal: 20,
  },
  back: {
    marginRight: 20,
  },
  buyZone: {
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: "100%",
  },
  buyTotal: {
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
  },
  buyTotalLabel: {
    fontSize: 32,
    color: colors.textPrimary,
    fontFamily: fonts.robotoBold,
  },
  buyPrice: {
    fontFamily: fonts.robotoBold,
    color: colors.textPrimary,
    fontSize: 32,
  },
  buyButton: {
    backgroundColor: colors.bgSuccess,
    width: "80%",
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  buyButtonText: {
    fontSize: 24,
    fontFamily: fonts.robotoBold,
    color: colors.textPrimary,
  },
});
