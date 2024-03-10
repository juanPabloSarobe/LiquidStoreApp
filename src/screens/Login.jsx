import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const onSubmit = () => {
    console.log("onSubmit");
  };
  return (
    <View style={styles.container}>
      <View style={styles.submit}>
        <Text style={styles.title}>Inicio de Sesión</Text>
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
      <View style={styles.submit}>
        <SubmitButton onPress={onSubmit} title="Iniciar Sesion" />
      </View>
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.register}>No tenes una cuenta?</Text>
      </Pressable>
    </View>
  );
};

export default Login;

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
  register: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
    textDecorationColor: "blue",
    fontSize: 18,
  },
});
