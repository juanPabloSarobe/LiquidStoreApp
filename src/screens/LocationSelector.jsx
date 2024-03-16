import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import fonts from "../utils/global/fonts";
import * as Location from "expo-location";

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [errorMSg, setErrorMSg] = useState(null);
  const [address, setAddress] = useState("");
  const colors = useSelector((state) => state.colors);

  const mapsKey = process.env.EXPO_PUBLIC_MAPS_KEY;

  useEffect(() => {
    //Funciona anonima autoexecutable,
    /* primer parentesis declaracion de la funcion
        segundo parentesis recibe variables
        llaves lo que vamos a ejecutar
        ultimo parentesis fuera de la funcion, ejecuta la funcion
    (()=>{

    })() */
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMSg(
          "permisos denegados. por favor otorgar los permisos para conocer su ubicacion"
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      console.log(location);
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const confirmLocation = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container(colors)}>
      <Text style={styles.title(colors)}>Agregar ubicacion a tu perfil</Text>
      <Text style={styles.title(colors)}>San Martin 1923, Neuquen Capital</Text>
      <MapPreview latitude={location.latitude} longitude={location.longitude} />
      <Button
        title="Confirmar foto"
        onPress={confirmLocation}
        color={colors.bgSuccess}
        disabled={location.latitude ? false : true}
      />
    </View>
  );
};

export default LocationSelector;

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
});
