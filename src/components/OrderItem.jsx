import { FlatList, StyleSheet, Text, View } from "react-native";
import fonts from "../utils/global/fonts";
import OrderItemProduct from "./OrderItemProduct";
import { useSelector } from "react-redux";

const OrderItem = ({ navigation, item }) => {
  const colors = useSelector((state) => state.colors);
  return (
    <View style={styles.mainContainer(colors)}>
      <View style={styles.titleZone}>
        <Text style={styles.text(colors)}>Compra id: {item.id}</Text>
        <Text style={styles.date(colors)}> {item.fecha}</Text>
      </View>
      <Text style={styles.detalle(colors)}>Detalle de la compra</Text>
      <FlatList
        style={styles.flatStyle}
        data={item.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItemProduct item={item} navigation={navigation} />
        )}
      />

      <View style={styles.totalZone(colors)}>
        <Text style={styles.total(colors)}>Total</Text>
        <Text style={styles.total(colors)}>{item.total}</Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  mainContainer: (colors) => {
    return {
      flex: 1,
      backgroundColor: colors.bgSecondary,
      height: "100%",
      width: "100%",
      marginVertical: 10,
      borderRadius: 10,
      padding: 5,
    };
  },
  titleZone: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: (colors) => {
    return {
      fontFamily: fonts.robotoBold,
      color: colors.textSecondary,
      fontSize: 12,
    };
  },
  container: (colors) => {
    return {
      flexDirection: "row",
      height: 200,
      backgroundColor: colors.bgSecondary,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
    };
  },
  flatStyle: {
    flex: 1,
    height: "100%",
    marginTop: 10,
  },
  text: (colors) => {
    return {
      fontFamily: fonts.robotoBold,
      color: colors.textSecondary,
      fontSize: 12,
    };
  },
  totalZone: (colors) => {
    return {
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: colors.bgPrimary,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      paddingVertical: 5,
    };
  },
  total: (colors) => {
    return {
      fontFamily: fonts.robotoBold,
      color: colors.textPrimary,
      fontSize: 24,
    };
  },
  detalle: (colors) => {
    return {
      fontFamily: fonts.robotoBold,
      color: colors.textPrimary,
      fontSize: 24,
      marginTop: 15,
    };
  },
});
