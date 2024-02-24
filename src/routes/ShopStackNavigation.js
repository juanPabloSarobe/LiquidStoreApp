import { StyleSheet, Text, View } from "react-native";
import Home from "../screens/Home";
import ProductsByCategory from "../screens/ProductsByCategory";
import ProductDetail from "../screens/ProductDetail";
import colors from "../utils/global/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const ShopStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: "LiquidStore",
        headerStyle: {
          backgroundColor: colors.bgSecondary,
        },
        headerTintColor: colors.textSecondary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ProductsByCategory"
        component={ProductsByCategory}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopStackNavigation;

const styles = StyleSheet.create({});
