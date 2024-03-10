import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const InputForm = ({
  label,
  value,
  onChangeText,
  isSecure,
  error,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPositionY = useSharedValue(20); // Altura inicial del label

  const handleFocus = () => {
    setIsFocused(true);
    labelPositionY.value = withTiming(0, {
      duration: 300,
      easing: Easing.ease,
    });
  };

  const handleBlur = () => {
    setIsFocused(false);
    labelPositionY.value = withTiming(20, {
      duration: 300,
      easing: Easing.ease,
    });
  };

  const labelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: labelPositionY.value }],
    };
  });
  return (
    <View style={styles.inputContainer}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {!isFocused ? "" : placeholder}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={isSecure}
        placeholder={!isFocused ? placeholder : null}
        placeholderTextColor={colors.textSecondary}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 20,
  },
  input: {
    width: "90%",
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: "white",
    borderRadius: 10,
    padding: 10,
    fontFamily: fonts.robotoBlack,
    fontSize: 16,
    marginHorizontal: "5%",
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: colors.bgSecondary,
    color: colors.textPrimary,
  },
  titleInput: {
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 16,
    fontFamily: fonts.robotoBlack,
  },
  error: {
    fontSize: 16,
    color: "red",
    fontFamily: fonts.robotoBlack,
    fontStyle: "italic",
    marginLeft: 20,
  },
  label: {
    position: "absolute",
    left: 30,
    top: -10,
    fontSize: 16,
    color: "gray",
  },
});
