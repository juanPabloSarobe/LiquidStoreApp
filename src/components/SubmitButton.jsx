import { StyleSheet, Text, Pressable, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

const SubmitButton = ({ title, onPress, isLoading }) => {
  const colors = useSelector((state) => state.colors);
  return (
    <Pressable style={styles.button(colors)} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      {isLoading && <ActivityIndicator color={colors.bgPrimary} />}
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: (colors) => {
    return {
      width: "60%",
      backgroundColor: colors.bgSuccess,
      padding: 10,
      alignItems: "center",
      borderRadius: 10,
      justifyContent: "center",
      flexDirection: "row",
    };
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});
