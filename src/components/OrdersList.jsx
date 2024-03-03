import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import colors from "../utils/global/colors";
import ordersArr from "../utils/data/orders.json";
import OrderItem from "./OrderItem";

const OrdersList = ({ navigation }) => {
  const [orders, setOrders] = useState(ordersArr);
  console.log(orders);
  const emptyOrders = false;
  if (emptyOrders) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Aun no ha realizado ninguna compra</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatStyle}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default OrdersList;

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
});
