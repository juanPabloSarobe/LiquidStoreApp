import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OrdersList from "../components/OrdersList";
import colors from "../utils/global/colors";

const Orders = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Ordenes de Compras</Text>
      <OrdersList navigation={navigation} />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    width: "100%",
  },
  text: {
    textAlign: "center",
    fontSize: 32,
    color: colors.textSecondary,
    marginHorizontal: 20,
  },
});
