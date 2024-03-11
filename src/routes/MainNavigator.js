import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../utils/global/colors";
import { StatusBar } from "expo-status-bar";
import ShopStackNavigation from "./ShopStackNavigation";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import { Entypo, Octicons, FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import AuthDrawerNavigation from "./AuthDrawerNavigation";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const user = useSelector((state) => state.counter);
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <StatusBar style={colors.tipe == "light" ? "dark" : "light"} />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Shop"
          screenOptions={{
            tabBarActiveTintColor: colors.textPrimary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarActiveBackgroundColor: colors.bgSecondary,
            tabBarInactiveBackgroundColor: colors.bgPrimary,
            tabBarHideOnKeyboard: true,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.labelStyle,
            tabBarIconStyle: styles.iconStyle,

            headerTitleAlign: "center",

            headerStyle: {
              backgroundColor: colors.bgSecondary,
            },
            headerTintColor: colors.textSecondary,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Tab.Screen
            name="Shop"
            component={ShopStackNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Entypo name="shop" size={28} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarIcon: ({ color }) => (
                <Entypo name="shopping-cart" size={28} color={color} />
              ),
              tabBarBadge: cart.quantityTotal > 0 && cart.quantityTotal,
              tabBarBadgeStyle: cart.quantityTotal <= 0 && {
                backgroundColor: "transparent",
              },
              headerTitle: "Carrito",
            }}
          />
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{
              tabBarIcon: ({ color }) => (
                <Octicons name="list-unordered" size={28} color={color} />
              ),
              headerTitle: "Compras",
              unmountOnBlur: true,
            }}
          />

          <Tab.Screen
            name="UserTab"
            component={AuthDrawerNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome name="user" size={28} color={color} />
              ),
              tabBarLabel: user.idToken ? user.displayName : "login",
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: "9%",

    backgroundColor: colors.bgPrimary,
  },
  iconStyle: {
    marginTop: 2,
  },
  labelStyle: {
    marginBottom: 4,
    fontSize: 14,
  },

  logo: {
    height: 50,
  },
});
