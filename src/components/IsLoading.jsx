import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import React from "react";
import { useSelector } from "react-redux";

const IsLoading = () => {
  const colors = useSelector((state) => state.colors);
  return (
    <View style={styles.container(colors)}>
      <ActivityIndicator size={50} color={colors.textPrimary} />
    </View>
  );
};

export default IsLoading;

const styles = StyleSheet.create({
  container: (colors) => {
    return {
      flex: 1,
      backgroundColor: colors.bgPrimary,
      justifyContent: "center",
    };
  },
});
