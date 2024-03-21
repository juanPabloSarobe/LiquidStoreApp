import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import fonts from "../utils/global/fonts";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllitems, buyCart } from "../features/cart/cartSlice";
import { usePostOrderMutation } from "../app/services/shop";

const CartList = ({ navigation }) => {
  const user = useSelector((state) => state.counter);
  const cart = useSelector((state) => state.cart);
  const colors = useSelector((state) => state.colors);
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
        { text: "login", onPress: () => navigation.navigate("UserTab") },
      ]);
    } else {
      dispatch(buyCart());
      navigation.navigate("Orders");
    }
  };
  if (emptyCart) {
    return (
      <View style={styles.container(colors)}>
        <Text style={styles.text(colors)}>Su carrito se encuentra vacio</Text>
      </View>
    );
  }
  return (
    <>
      <View style={styles.container(colors)}>
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
          <Text style={styles.buyTotalLabel(colors)}>Total: $</Text>
          <Text style={styles.buyPrice(colors)}> {cart.total}</Text>
        </View>
        <Pressable
          style={styles.buyButton(colors)}
          onPress={() => confirmCart()}
        >
          <Text style={styles.buyButtonText(colors)}>Finalizar compra</Text>
        </Pressable>
      </View>
    </>
  );
};

export default CartList;

const styles = StyleSheet.create({
  container: (colors) => {
    return {
      backgroundColor: colors.bgPrimary,
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    };
  },
  flatStyle: {
    flex: 1,
    height: "100%",
  },
  text: (colors) => {
    return {
      textAlign: "center",
      fontSize: 32,
      color: colors.textSecondary,
      marginHorizontal: 20,
    };
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
  buyTotalLabel: (colors) => {
    return {
      fontSize: 32,
      color: colors.textPrimary,
      fontFamily: fonts.robotoBold,
    };
  },
  buyPrice: (colors) => {
    return {
      fontFamily: fonts.robotoBold,
      color: colors.textPrimary,
      fontSize: 32,
    };
  },
  buyButton: (colors) => {
    return {
      backgroundColor: colors.bgSuccess,
      width: "80%",
      height: 40,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 6,
    };
  },
  buyButtonText: (colors) => {
    return {
      fontSize: 24,
      fontFamily: fonts.robotoBold,
      color: colors.textPrimary,
    };
  },
});
