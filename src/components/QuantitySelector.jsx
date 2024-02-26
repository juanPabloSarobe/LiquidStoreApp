import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../utils/global/colors";
import { useState } from "react";

const QuantitySelector = ({ item }) => {
  const [quantity, setQuantity] = useState(
    item.quantity > 0 ? item.quantity : 1
  );

  const plusQuantity = () => {
    quantity < item.stock && setQuantity(quantity + 1);
  };

  const minusQuantity = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  return (
    <View>
      <View style={styles.selector}>
        <Pressable style={styles.button} onPress={minusQuantity}>
          <AntDesign name="minus" size={30} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.quantityText}>
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

export default QuantitySelector;

const styles = StyleSheet.create({
  selector: {
    flexDirection: "row",
    width: 130,
    height: 40,
    borderColor: colors.textSecondary,
    borderWidth: 0.5,
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 24,
  },
  button: {
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
