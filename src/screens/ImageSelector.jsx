import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  usePatchProfileImageMutation,
} from "../app/services/profile";

import * as ImagePicker from "expo-image-picker";
const ImageSelector = ({ navigation }) => {
  const colors = useSelector((state) => state.colors);
  // const { localId } = useSelector((state) => state.counter);
  const { localId } = useSelector((state) => state.auth);
  const [newImage, setNewImage] = useState(false);
  const [image, setImage] = useState("");
  const [triggerImage] = usePatchProfileImageMutation();
  const { data, isSuccess } = useGetProfileQuery(localId);

  useEffect(() => {
    if (isSuccess) {
      setImage(data?.image);
    }
  }, [isSuccess, data]);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (granted) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
        base64: true,
      });
      if (!result.canceled) {
        setImage("data:image/jpeg;base64," + result.assets[0].base64);
        setNewImage(true);
      }
    }
  };
  const confirmImage = () => {
    triggerImage({ image, localId });
    navigation.goBack();
  };

  return (
    <View style={styles.container(colors)}>
      <Image
        source={image ? { uri: image } : require("../../assets/user.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <Button title="Tomar foto" onPress={pickImage} />
      <Button
        title="Confirmar foto"
        onPress={confirmImage}
        color={colors.bgSuccess}
        disabled={newImage ? false : true}
      />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: (colors) => {
    return {
      flex: 1,
      alignItems: "center",
      paddingTop: 20,
      backgroundColor: colors.bgPrimary,
      gap: 20,
    };
  },
  image: {
    marginVertical: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
