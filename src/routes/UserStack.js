import { createNativeStackNavigator } from "@react-navigation/native-stack";
import User from "../screens/User";
import ImageSelector from "../screens/ImageSelector";
import { useSelector } from "react-redux";
import LocationSelector from "../screens/LocationSelector";

const Stack = createNativeStackNavigator();
const ProfileStack = ({ navigation }) => {
  const colors = useSelector((state) => state.colors);
  const user = useSelector((state) => state.counter);
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerShown: true,
        headerTitle: ` ${user.displayName}`,
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
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="ImageSelector" component={ImageSelector} />
      <Stack.Screen name="LocationSelector" component={LocationSelector} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
