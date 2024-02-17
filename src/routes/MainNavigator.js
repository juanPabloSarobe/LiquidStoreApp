import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ProductsByCategory from "../screens/ProductsByCategory";
import ProductDetail from "../screens/ProductDetail";
import colors from "../utils/global/colors";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
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
      </NavigationContainer>
    </>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  logo: {
    height: 50,
  },
});
