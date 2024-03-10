import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../screens/Login";
import Register from "../screens/Register";
import User from "../screens/User";
import colors from "../utils/global/colors";
const Drawer = createDrawerNavigator();

const AuthDrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.bgSecondary,
        },
        headerTintColor: colors.textSecondary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerIcon: "",
        drawerStyle: {
          backgroundColor: colors.bgPrimary,
          width: 240,
        },
        drawerActiveTintColor: colors.textPrimary,
        drawerInactiveTintColor: colors.textSecondary,
      }}
    >
      <Drawer.Screen name="User" component={User} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
    </Drawer.Navigator>
  );
};

export default AuthDrawerNavigation;

const styles = StyleSheet.create({});
