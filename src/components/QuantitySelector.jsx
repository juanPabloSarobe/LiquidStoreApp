import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../utils/global/colors";

const QuantitySelector = ({ plusQuantity, minusQuantity, quantity }) => {
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
    color: colors.textPrimary,
  },
  button: {
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
