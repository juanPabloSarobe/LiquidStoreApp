import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import OrderItem from "./OrderItem";
import { useGetOrdersByUserQuery } from "../app/services/shop";
import IsLoading from "./IsLoading";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Alert } from "react-native";

const OrdersList = ({ navigation }) => {
  //const user = useSelector((state) => state.counter);
  const user = useSelector((state) => state.auth);
  const colors = useSelector((state) => state.colors);
  const [emptyOrders, setEmptyOrders] = useState(false);
  const isFocused = useIsFocused();

  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useGetOrdersByUserQuery(user?.localId);

  useEffect(() => {
    if (isSuccess) {
      if (orders.length == 0) {
        setEmptyOrders(true);
      } else {
        setEmptyOrders(false);
      }
    }
  }, [orders, isFocused]);

  if (isLoading) return <IsLoading />;
  if (emptyOrders) {
    return (
      <View style={styles.container(colors)}>
        <Text style={styles.text(colors)}>
          Aun no ha realizado ninguna compra
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container(colors)}>
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
    marginTop: 15,
    flex: 1,
    height: "100%",
    width: "100%",
    marginVertical: 20,
  },
  text: (colors) => {
    return {
      textAlign: "center",
      fontSize: 32,
      color: colors.textSecondary,
      marginHorizontal: 20,
    };
  },
});
