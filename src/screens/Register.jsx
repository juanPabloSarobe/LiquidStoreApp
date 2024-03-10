import { StyleSheet, Text, View, Pressable } from "react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const onSubmit = () => {
    console.log("onSubmit");
  };

  return (
    <View style={styles.container}>
      <View style={styles.submit}>
        <Text style={styles.title}>Crea tu cuenta</Text>
      </View>
      <InputForm
        value={email}
        onChangeText={(t) => setEmail(t)}
        isSecure={false}
        error={errorEmail}
        placeholder={"email"}
      />
      <InputForm
        value={password}
        onChangeText={(t) => setPassword(t)}
        isSecure={true}
        error={errorPassword}
        placeholder={"password"}
      />
      <InputForm
        value={confirmPassword}
        onChangeText={(t) => setConfirmPassword(t)}
        isSecure={true}
        error={errorConfirmPassword}
        placeholder={"Confirmar Password"}
      />
      <View style={styles.submit}>
        <SubmitButton onPress={onsubmit} title="Registrarme" />
      </View>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.login}>ya tenes una cuenta?</Text>
      </Pressable>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    alignItems: "center",
    paddingBottom: 10,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fonts.robotoBold,
    fontSize: 20,
    marginTop: 10,
  },
  submit: {
    marginTop: 20,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
    textDecorationColor: "blue",
    fontSize: 18,
  },
});
