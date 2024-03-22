import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../screens/Login";
import Register from "../screens/Register";
import UserStack from "../routes/UserStack";

import { useSelector } from "react-redux";
const Drawer = createDrawerNavigator();

const AuthDrawerNavigation = () => {
  // const user = useSelector((state) => state.counter);
  const user = useSelector((state) => state.auth);
  const colors = useSelector((state) => state.colors);
  return (
    <Drawer.Navigator
      /* initialRouteName="Login" */
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
      {user.idToken ? (
        <Drawer.Screen
          name="UserStack"
          component={UserStack}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default AuthDrawerNavigation;

const styles = StyleSheet.create({});
