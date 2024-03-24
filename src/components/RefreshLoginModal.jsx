import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import fonts from "../utils/global/fonts";
import { MaterialIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import toast from "./ToastProxy";

const RefreshLoginModal = ({
  isVisible,
  handleRefreshLoginModal,
  closeRefreshLoginModal,
  user,
}) => {
  const colors = useSelector((state) => state.colors);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const LocalAuthenticationOptions = {
    promptMessage: "Ingresá con tu huella digital",
    cancelLabel: "cancel",
  };

  useEffect(() => {
    /* (async () => {})(); */
    handleLocalAuth();
  }, []);

  const handleLocalAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(compatible);

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return Alert.alert(
        "Biometric record not found",
        "Please verify your identity with your password",
        "OK"
      );

    const { success, error } = await LocalAuthentication.authenticateAsync(
      LocalAuthenticationOptions
    );
    if (success) {
      handleRefreshLoginModal(false);
      toast(
        "Bienvenido de vuelta",
        3000,
        -90,
        colors.textPrimary,
        colors.bgPrimary,
        1500
      );
    }
    if (error) {
      toast("Sensor cerrado", 2000, 0);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      styles={styles.modal}
      onRequestClose={() => {
        closeRefreshLoginModal(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.imageZone}>
            <Image
              source={require("../../assets/liquidStoreLogo.png")}
              style={styles.image}
            />
            <Text style={styles.title}>{`Hola ${user.displayName} 😀`}</Text>
            <Text style={styles.subtitle}>Ingresa con tu huella digital</Text>
          </View>
          <Pressable style={styles.presentationZone} onPress={handleLocalAuth}>
            <MaterialIcons
              name="fingerprint"
              size={80}
              color={"black"}
              style={styles.fingerprintIcon}
            />
            <Text style={styles.subtitle}>Abrir Sensor biometrico</Text>

            {/*  <Text style={styles.autor}>Autor: Juan Pablo Sarobe</Text> */}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default RefreshLoginModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    objectFit: "cover",
    resizeMode: "contain",
  },
  imageZone: {
    flex: 2,
    width: "100%",
    height: 80,
    resizeMode: "contain",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 70,
    resizeMode: "contain",
  },
  presentationZone: {
    flex: 3,
    width: "100%",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
  },
  fingerprintIcon: {
    backgroundColor: "#dddddd",
    width: 100,
    height: 100,
    borderRadius: 50,
    textAlign: "center",
    textAlignVertical: "center",
  },
  title: {
    color: "black",
    fontSize: 28,
    fontFamily: fonts.robotoBlack,
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontFamily: fonts.robotoBold,
  },
  text: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontFamily: fonts.robotoRegular,
    paddingVertical: 6,
  },
  autor: {
    flex: 1,
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontFamily: fonts.robotoBlack,
  },
  buttonZone: {
    flex: 1,
  },
});
