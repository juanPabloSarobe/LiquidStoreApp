import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import OrderItemProduct from "./OrderItemProduct";

const OrderItem = ({ navigation, item }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>OrderItem: {item.total}</Text>

      <FlatList
        style={styles.flatStyle}
        data={item.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItemProduct item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
    height: "100%",
  },
  container: {
    flexDirection: "row",
    height: 200,
    margin: 20,
    backgroundColor: colors.bgSecondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  text: {
    fontFamily: fonts.robotoBold,
    color: colors.textPrimary,
    fontSize: 24,
  },
});
