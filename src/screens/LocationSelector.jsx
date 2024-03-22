import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import fonts from "../utils/global/fonts";
import * as Location from "expo-location";
import { usePutUserLocationMutation } from "../app/services/profile";

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [errorMSg, setErrorMSg] = useState(null);
  const [address, setAddress] = useState("");
  const colors = useSelector((state) => state.colors);
  //const { localId } = useSelector((state) => state.counter);
  const { localId } = useSelector((state) => state.auth);
  const [triggerPutUserLocation] = usePutUserLocationMutation();
  const mapsKey = process.env.EXPO_PUBLIC_MAPS_KEY;

  useEffect(() => {
    //Funcion anonima autoexecutable,
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

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (location.latitude) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${mapsKey}`
        );
        const data = await response.json();
        setAddress(data?.results[0]?.formatted_address);
      }
    })();
  }, [location]);

  const confirmLocation = async () => {
    await triggerPutUserLocation({ localId, address });
    navigation.goBack();
  };

  return (
    <View style={styles.container(colors)}>
      <Text style={styles.title(colors)}>Agregar ubicacion a tu perfil</Text>
      <Text style={styles.title(colors)}>{address}</Text>
      <MapPreview latitude={location.latitude} longitude={location.longitude} />
      <Button
        title="Confirmar Ubicación"
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
