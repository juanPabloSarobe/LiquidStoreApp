import { Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import fonts from "../utils/global/fonts";

const WelcomeModal = ({ isVisible, handleModal }) => {
  const colors = useSelector((state) => state.colors);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      styles={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.imageZone}>
            <Image
              source={require("../../assets/liquidStoreLogo.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.presentationZone}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>
              LIQUIDSTORE NO ES UNA TIENDA REAL
            </Text>
            <Text style={styles.text}>
              Esta app es un trabajo practico para el curso de React Native de
              coderhouse, comisión 53280. Al ingresar a la app, aceptas que esta
              aplicación no es una tienda real, que no se compra, vende ni
              transacciona nada. Es un trabajo práctico, donde se demuestran los
              conceptos aprendidos en clase.
            </Text>
            <Text style={styles.autor}>Autor: Juan Pablo Sarobe</Text>
          </View>
          <View style={styles.buttonZone}>
            <Button
              title="Ingresar"
              color={colors.bgSuccess}
              onPress={() => {
                handleModal(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WelcomeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "80%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    objectFit: "cover",
    resizeMode: "contain",
  },
  imageZone: {
    flex: 1,
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
    flex: 6,
    width: "100%",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  title: {
    color: "blue",
    fontSize: 28,
    fontFamily: fonts.robotoBlack,
  },
  subtitle: {
    color: "black",
    fontSize: 28,
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
