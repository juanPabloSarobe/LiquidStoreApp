import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import OrderItemProduct from "./OrderItemProduct";

const OrderItem = ({ navigation, item }) => {
  console.log(item.items);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleZone}>
        <Text style={styles.text}>Compra id: {item.id}</Text>
        <Text style={styles.date}> {item.fecha}</Text>
      </View>
      <Text style={styles.detalle}>Detalle de la compra</Text>
      <FlatList
        style={styles.flatStyle}
        data={item.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItemProduct item={item} navigation={navigation} />
        )}
      />

      <View style={styles.totalZone}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>{item.total}</Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
    height: "100%",
    width: "100%",
    marginVertical: 10,
    borderRadius: 10,
    padding: 5,
  },
  titleZone: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: colors.textSecondary,
  },
  container: {
    flexDirection: "row",
    height: 200,

    backgroundColor: colors.bgSecondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  flatStyle: {
    flex: 1,
    height: "100%",
    marginTop: 10,
  },
  text: {
    fontFamily: fonts.robotoBold,
    color: colors.textPrimary,
    fontSize: 16,
  },
  totalZone: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: colors.bgPrimary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 5,
  },
  total: {
    fontFamily: fonts.robotoBold,
    color: colors.textPrimary,
    fontSize: 24,
  },
  detalle: {
    fontFamily: fonts.robotoBold,
    color: colors.textPrimary,
    fontSize: 24,
    marginTop: 5,
  },
});
