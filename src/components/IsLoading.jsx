import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import React from "react";
import colors from "../utils/global/colors";

const IsLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={colors.textPrimary} />
    </View>
  );
};

export default IsLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    justifyContent: "center",
  },
});
