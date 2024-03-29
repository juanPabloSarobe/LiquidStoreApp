import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import toast from "./ToastProxy";

const QuantitySelectorCart = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const colors = useSelector((state) => state.colors);

  const [quantity, setQuantity] = useState(cart.quantity);
  const [newItem, setNewItem] = useState({});

  const plusQuantity = () => {
    if (quantity < item.stock) {
      setQuantity(quantity + 1);
      toast("Unidad agregada al carrito", 1000, -90);
    }
  };
  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      toast("Unidad retirada del carrito", 1000, -90);
    }
  };
  useEffect(() => {
    if (quantity < item.quantity || quantity > item.quantity)
      dispatch(addItemToCart(newItem));
  }, [newItem]);

  useEffect(() => {
    setNewItem({ ...item, quantity: quantity });
  }, [quantity]);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [cart]);

  return (
    <View>
      <View style={styles.selector(colors)}>
        <Pressable style={styles.button} onPress={minusQuantity}>
          <AntDesign name="minus" size={30} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.quantityText(colors)}>
          {"  "}
          {quantity}
          {"  "}
        </Text>
        <Pressable style={styles.button} onPress={plusQuantity}>
          <AntDesign name="plus" size={30} color={colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
};

export default QuantitySelectorCart;

const styles = StyleSheet.create({
  selector: (colors) => {
    return {
      flexDirection: "row",
      width: 130,
      height: 40,
      borderColor: colors.textSecondary,
      borderWidth: 0.5,
      borderRadius: 50,
      justifyContent: "space-between",
      alignItems: "center",
    };
  },
  quantityText: (colors) => {
    return {
      fontSize: 24,
      color: colors.textPrimary,
    };
  },
  button: {
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
