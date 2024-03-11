import { StyleSheet, Text, View, Pressable } from "react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";
import colors from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import { useRegisterMutation } from "../app/services/auth";
import { useDispatch } from "react-redux";
//import { getUser } from "../features/auth/authSlice2";

const Register = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const [triggerRegister] = useRegisterMutation();

  const onSubmit = async () => {
    const { data } = await triggerRegister({
      email,
      password,
      displayName: nombre,
    });

    dispatch(
      getUser({
        email: data.email,
        idToken: data.idToken,
        displayName: data.displayName,
        localId: data.localId,
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.submit}>
        <Text style={styles.title}>Crea tu cuenta</Text>
      </View>
      <InputForm
        value={nombre}
        onChangeText={(t) => setNombre(t)}
        isSecure={false}
        error={errorNombre}
        placeholder={"Nombre"}
      />
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
        <SubmitButton onPress={onSubmit} title="Registrarme" />
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
