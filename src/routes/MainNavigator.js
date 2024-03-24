import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import colors from "../utils/global/colors";
import { StatusBar } from "expo-status-bar";
import ShopStackNavigation from "./ShopStackNavigation";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import { Entypo, Octicons, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import AuthDrawerNavigation from "./AuthDrawerNavigation";
import { useEffect, useState } from "react";
import { eraseTable, fetchSession, show } from "../utils/db";
import { getUser } from "../features/auth/authSlice";
import { useGetProfileQuery } from "../app/services/profile";
import { setDark, setLight } from "../features/colors/colorsSlice";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.counter);
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const colors = useSelector((state) => state.colors);
  const {
    data: datos,
    isLoading,
    isSuccess,
  } = useGetProfileQuery(user.localId);
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    (async () => {
      const session = await fetchSession();

      /* const tables = await show();
      console.log(tables.rows._array); */

      if (session.rows.length) {
        const now = Math.floor(Date.now() / 1000);
        const updateAt = session.rows._array[0].updateAt;
        const sessionTime = now - updateAt;
        if (sessionTime < 40) {
          console.log(sessionTime);
          const data = session.rows._array[0];
          dispatch(
            getUser({
              email: data.email,
              idToken: data.idToken,
              displayName: data.displayName,
              localId: data.localId,
            })
          );
        }
      }
    })();
  }, [user]);
  useEffect(() => {
    if (isSuccess) {
      setIsEnabled(datos?.dark);
    }
  }, [datos]);

  useEffect(() => {
    if (!isEnabled) {
      dispatch(setLight());
    } else {
      dispatch(setDark());
    }
  }, [isEnabled]);

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
            tabBarStyle: styles.tabBar(colors),
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
  tabBar: (colors) => {
    return {
      height: "9%",

      backgroundColor: colors.bgPrimary,
    };
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
