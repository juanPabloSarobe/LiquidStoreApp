import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../components/Header";
import ShadowPrimary from "../components/wrappers/ShadowPrimary";
import colors from "../utils/global/colors";
import products from "../utils/data/products.json";
import { useEffect, useState } from "react";
import fonts from "../utils/global/fonts";
const screenWidth = Dimensions.get("window").width;

const ProductDetail = ({ navigate, route }) => {
  const { productSelectedId } = route.params;
  console.log(productSelectedId);
  const [productSelected, setProductSelected] = useState({});

  useEffect(() => {
    const filtro = products.filter(
      (product) => product.id === productSelectedId
    );
    setProductSelected(...filtro);
  }, [productSelectedId]);

  return (
    <View>
      <ShadowPrimary style={[styles.container, { width: screenWidth - 40 }]}>
        <Image style={styles.cardImg} source={{ uri: productSelected.img }} />
        <View style={styles.cardDetail}>
          <Text style={styles.description}> {productSelected.description}</Text>
          <View style={styles.priceZone}>
            <Text style={styles.price}> Precio: {productSelected.price}</Text>
            <Button title="Comprar" color={colors.bgSuccess} />
          </View>
        </View>
      </ShadowPrimary>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    height: "70%",
    margin: 20,
    backgroundColor: colors.bgSecondary,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardImg: {
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardDetail: {
    flex: 1,
    padding: 7,
  },
  text: {
    fontFamily: fonts.robotoBold,
    color: colors.textPrimary,
    fontSize: 32,
    flex: 3,
  },
  description: {
    color: colors.textPrimary,
    fontFamily: fonts.robotoItalic,
    fontSize: 24,
    flex: 6,
  },
  priceZone: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  price: {
    fontSize: 24,
    color: colors.textPrimary,
  },
});
