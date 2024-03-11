import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OrdersList from "../components/OrdersList";
import { useSelector } from "react-redux";

const Orders = ({ navigation }) => {
  const colors = useSelector((state) => state.colors);
  return (
    <View style={styles.container(colors)}>
      <OrdersList navigation={navigation} />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: (colors) => {
    return {
      flex: 1,
      backgroundColor: colors.bgPrimary,
      width: "100%",
    };
  },
});
