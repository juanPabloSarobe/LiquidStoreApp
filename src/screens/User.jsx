import { StyleSheet, Text, View } from "react-native";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";

const User = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Screen</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    alignItems: "center",
    paddingBottom: 10,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fonts.robotoBold,
    fontSize: 20,
    marginTop: 10,
  },
});
