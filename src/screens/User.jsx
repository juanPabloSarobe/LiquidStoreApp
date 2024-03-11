import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useSelector } from "react-redux";
//import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/counter/counterSlice";
import { setLight, setDark } from "../features/colors/colorsSlice";
import { Button } from "react-native";
import { useEffect, useState } from "react";

const User = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.counter);

  useEffect(() => {
    if (!isEnabled) {
      dispatch(setLight());
    } else {
      dispatch(setDark());
    }
  }, [isEnabled]);

  return (
    <View style={styles.container(colors)}>
      <Text style={styles.title(colors)}>Bienvenido {user.displayName}</Text>

      <Text style={styles.title(colors)}>Configuration</Text>
      <View style={styles.colorThemeZone}>
        <Text style={styles.title(colors)}> Color Theme</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

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
  container: (colors) => {
    return {
      flex: 1,
      backgroundColor: colors.bgPrimary,
      alignItems: "center",
      paddingBottom: 10,
    };
  },
  title: (colors) => {
    return {
      color: colors.textPrimary,
      fontFamily: fonts.robotoBold,
      fontSize: 20,
      marginTop: 10,
    };
  },
  colorThemeZone: {
    flexDirection: "row",
  },
});
