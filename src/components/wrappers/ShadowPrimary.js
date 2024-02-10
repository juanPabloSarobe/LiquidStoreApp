import { StyleSheet, View } from "react-native";
import colors from "../../utils/global/colors";

const ShadowPrimary = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default ShadowPrimary;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    shadowColor: colors.textSecondary,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
});
