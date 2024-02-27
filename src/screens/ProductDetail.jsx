import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ShadowPrimary from "../components/wrappers/ShadowPrimary";
import colors from "../utils/global/colors";
import products from "../utils/data/products.json";
import { useEffect, useLayoutEffect, useState } from "react";
import fonts from "../utils/global/fonts";
import QuantitySelector from "../components/QuantitySelector";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";

const screenWidth = Dimensions.get("window").width;

const ProductDetail = ({ route, navigation }) => {
  const { productSelectedId } = route.params;
  const [productSelected, setProductSelected] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [item, setItem] = useState({});

  const dispatch = useDispatch();

  const plusQuantity = () => {
    quantity < productSelected.stock && setQuantity(quantity + 1);
  };
  const minusQuantity = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: productSelected.title,
    });
    setQuantity(productSelected.stock >= 1 ? 1 : 0);
  }, [productSelected]);

  useEffect(() => {
    const filtro = products.filter(
      (product) => product.id === productSelectedId
    );
    setProductSelected(...filtro, { quantity: 1 });
  }, [productSelectedId]);
  useEffect(() => {
    setItem({ ...productSelected, quantity: quantity });
  }, [quantity]);

  return (
    <View style={styles.mainContainer}>
      <ShadowPrimary style={[styles.container, { width: screenWidth - 40 }]}>
        <Image style={styles.cardImg} source={{ uri: productSelected.img }} />
        <View style={styles.cardDetail}>
          <Text style={styles.description}> {productSelected.description}</Text>
          <View style={styles.stockZone}>
            <Text style={styles.description}>
              Precio: {productSelected.price}
            </Text>
            <Text style={styles.description}>
              Stock: {productSelected.stock}
            </Text>
          </View>
          <View style={styles.priceZone}>
            <QuantitySelector
              plusQuantity={plusQuantity}
              minusQuantity={minusQuantity}
              quantity={quantity}
            />
            <Button
              title="Comprar"
              color={colors.bgSuccess}
              disabled={quantity === 0 && true}
              onPress={() => dispatch(addItemToCart(item))}
            />
          </View>
        </View>
      </ShadowPrimary>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },
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
  stockZone: {
    flex: 3,
    alignSelf: "flex-start",
    flexDirection: "row",
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
    flex: 4,
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
