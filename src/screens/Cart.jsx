import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CartList from "../components/CartList";
//import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";

const Cart = ({ navigation }) => {
  const colors = useSelector((state) => state.colors);
  return (
    <View style={styles.container(colors)}>
      <CartList navigation={navigation} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: (colors) => {
    return {
      flex: 1,
      backgroundColor: colors.bgPrimary,
      alignItems: "center",
      paddingBottom: 10,
    };
  },
});
