import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OrdersList from "../components/OrdersList";

const Orders = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <OrdersList navigation={navigation} />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
