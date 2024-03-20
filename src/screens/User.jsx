import { Image, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useSelector } from "react-redux";
//import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/counter/counterSlice";
import { setLight, setDark } from "../features/colors/colorsSlice";
import { Button } from "react-native";
import { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  usePutUserColorThemeMutation,
} from "../app/services/profile";

const User = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.counter);
  const [triggerPutUserColorTheme] = usePutUserColorThemeMutation();
  const { data, isLoading, isSuccess } = useGetProfileQuery(user.localId);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    if (isSuccess) {
      setIsEnabled(data.colorTheme.dark);
    }
  }, [data]);

  useEffect(() => {
    if (!isEnabled) {
      dispatch(setLight());
      triggerPutUserColorTheme({ localId: user.localId, dark: false });
    } else {
      dispatch(setDark());
      triggerPutUserColorTheme({ localId: user.localId, dark: true });
    }
    console.log(data?.colorTheme);
  }, [isEnabled]);

  const handlerExit = () => {
    dispatch(setLight());
    dispatch(clearUser());
  };

  return (
    <View style={styles.container(colors)}>
      <Text style={styles.title(colors)}>Configuración de perfil</Text>
      <View style={styles.buttonZone}>
        <Image
          source={
            data?.image
              ? { uri: data?.image?.image }
              : require("../../assets/user.png")
          }
          style={styles.image}
          resizeMode="cover"
        />
        <Button
          title={"Agregar Imagen de perfil"}
          onPress={() => navigation.navigate("ImageSelector")}
          color={colors.bgSuccess}
        />
        <Text style={styles.title(colors)}>
          {data?.address ? data?.address?.address : "Direccion no agregada"}
        </Text>
        <Button
          title={"Agregar ubicacion"}
          onPress={() => navigation.navigate("LocationSelector")}
          color={colors.bgSuccess}
        />
      </View>
      <View style={styles.colorThemeZone}>
        <Text style={styles.title(colors)}> Color Theme</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? colors.textPrimary : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Button
        title="Salir"
        color={colors.bgWarning}
        onPress={() => handlerExit()}
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
      marginVertical: 20,
    };
  },
  buttonZone: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  colorThemeZone: {
    flexDirection: "row",
  },
  image: {
    borderRadius: 100,
    width: 200,
    height: 200,
  },
});
