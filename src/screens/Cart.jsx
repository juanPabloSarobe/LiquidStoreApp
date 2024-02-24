import { Pressable, StyleSheet, Text, View } from "react-native";
import CartList from "../components/CartList";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";

const Cart = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CartList navigation={navigation} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    alignItems: "center",
    paddingBottom: 10,
  },
});
