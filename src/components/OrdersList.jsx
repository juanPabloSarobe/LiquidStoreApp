import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../utils/global/colors";
//import ordersArr from "../utils/data/orders.json";
import OrderItem from "./OrderItem";
import {
  useGetOrdersQuery,
  useGetOrdersByUserQuery,
} from "../app/services/shop";
import IsLoading from "./IsLoading";
import { useIsFocused } from "@react-navigation/native";

const OrdersList = ({ navigation }) => {
  const [emptyOrders, setEmptyOrders] = useState(false);
  const isFocused = useIsFocused();
  const { data, isLoading, isSuccess } = useGetOrdersByUserQuery("userName");
  const [orders, setOrders] = useState(!isLoading ? data : []);

  useEffect(() => {
    navigation.addListener("focus", () => {});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOrders(data);
      if (data.length == 0) {
        setEmptyOrders(true);
      } else {
        setEmptyOrders(false);
      }
    }
  }, [data, isFocused]);

  if (isLoading) return <IsLoading />;
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
    marginTop: 15,
    flex: 1,
    height: "100%",
    width: "100%",
    marginVertical: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 32,
    color: colors.textSecondary,
    marginHorizontal: 20,
  },
});
