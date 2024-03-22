import { Image, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useSelector } from "react-redux";
//import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/auth/authSlice";
import { setLight, setDark } from "../features/colors/colorsSlice";
import { Button } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  useGetProfileQuery,
  usePatchUserColorThemeMutation,
} from "../app/services/profile";

const User = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.counter);
  const user = useSelector((state) => state.auth);
  const [triggerPutUserColorTheme] = usePatchUserColorThemeMutation();
  const { data, isLoading, isSuccess } = useGetProfileQuery(user.localId);

  const toggleSwitch = () => {
    if (isEnabled) {
      triggerPutUserColorTheme({ localId: user.localId, dark: false });
      //setIsEnabled(false);
    } else {
      triggerPutUserColorTheme({ localId: user.localId, dark: true });
      //setIsEnabled(true);
    }
    setDisabled(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsEnabled(data?.dark);
    }
  }, [data]);

  useEffect(() => {
    if (!isEnabled) {
      dispatch(setLight());
    } else {
      dispatch(setDark());
    }
    setDisabled(false);
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
              ? { uri: data?.image }
              : require("../../assets/user.png")
          }
          style={styles.image}
          resizeMode="cover"
        />
        <Pressable
          style={styles.back(colors)}
          onPress={() => navigation.navigate("ImageSelector")}
        >
          <FontAwesome name="edit" size={25} color={colors.textSecondary} />
        </Pressable>
        <View style={styles.profileDetails}>
          <Text style={styles.title(colors)}>
            {user?.displayName ? user?.displayName : "Nombre no cargado"}
          </Text>
          <Text style={styles.title(colors)}>
            {user?.email ? user?.email : "email no cargado"}
          </Text>
          <View style={styles.locationZone}>
            <Text style={styles.title(colors)}>
              {data?.address ? data?.address : "Agregar dirección"}
            </Text>
            <Pressable
              style={styles.location(colors)}
              onPress={() => navigation.navigate("LocationSelector")}
            >
              <FontAwesome5
                name="chevron-right"
                size={25}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.colorThemeZone}>
        <Text style={styles.title(colors)}> Color Theme</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? colors.textPrimary : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          disabled={disabled}
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
      marginVertical: 8,
      marginLeft: 6,
    };
  },
  buttonZone: {
    flexDirection: "row",

    gap: 15,
    //justifyContent: "center",
    // alignItems: "center",
    position: "relative",
    width: "100%",
    // backgroundColor: "red",
  },
  colorThemeZone: {
    flexDirection: "row",
  },
  image: {
    borderRadius: 100,
    width: 90,
    height: 90,
  },
  back: (colors) => {
    return {
      position: "absolute",
      top: 55,
      left: 50,
      width: 50,
      height: 50,
      backgroundColor: colors.bgSecondary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    };
  },
  locationZone: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //backgroundColor: "red",
  },
  location: (colors) => {
    return {
      width: 50,
      height: 50,
      // backgroundColor: colors.bgSecondary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    };
  },
  profileDetails: {
    width: "70%",
  },
});
