import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/counter/counterSlice";
import { Button } from "react-native";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.counter);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido {user.displayName}</Text>
      <Button
        title="Salir"
        color={colors.bgWarning}
        onPress={() => dispatch(clearUser())}
      />
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
