import { Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import fonts from "../utils/global/fonts";
import { MaterialIcons } from "@expo/vector-icons";

const RefreshLoginModal = ({
  isVisible,
  handleRefreshLoginModal,
  closeRefreshLoginModal,
  user,
}) => {
  const colors = useSelector((state) => state.colors);

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
            <Text style={styles.title}>
              {`Bienvenido de vuelta 
${user.displayName}`}
            </Text>
            <Text style={styles.subtitle}>Ingresa con tu huella digital</Text>
          </View>
          <View style={styles.presentationZone}>
            <MaterialIcons
              name="fingerprint"
              size={80}
              color={colors.textSecondary}
            />
            <Text style={styles.subtitle}>
              Toca el sensor para volver a ingresar
            </Text>

            {/*  <Text style={styles.autor}>Autor: Juan Pablo Sarobe</Text> */}
          </View>
          <View style={styles.buttonZone}>
            <Button
              title="Ingresar"
              color={colors.bgSuccess}
              onPress={() => {
                handleRefreshLoginModal(false);
              }}
            />
          </View>
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
    flex: 2,
    width: "100%",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
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
