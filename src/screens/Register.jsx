import { StyleSheet, Text, View, Pressable } from "react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useEffect, useState } from "react";
import fonts from "../utils/global/fonts";
import { useRegisterMutation } from "../app/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/counter/counterSlice";
import { registerSchema } from "../utils/validations/authSchema";

const Register = ({ navigation }) => {
  const colors = useSelector((state) => state.colors);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const dispatch = useDispatch();

  const [triggerRegister] = useRegisterMutation();

  useEffect(() => {
    setIsLoginError(false);
  }, [nombre, email, password, confirmPassword]);

  const onSubmit = async () => {
    try {
      registerSchema.validateSync({ nombre, email, password, confirmPassword });
      const { data, error } = await triggerRegister({
        email,
        password,
        displayName: nombre,
      });
      if (error) {
        console.log(error);
        setIsLoginError(true);
      }
      dispatch(
        getUser({
          email: data.email,
          idToken: data.idToken,
          displayName: data.displayName,
          localId: data.localId,
        })
      );
    } catch (error) {
      setErrorNombre("");
      setErrorEmail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      switch (error.path) {
        case "nombre":
          setErrorNombre(error.message);
          break;
        case "email":
          setErrorEmail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        case "confirmPassword":
          setErrorConfirmPassword(error.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.container(colors)}>
      <View style={styles.submit}>
        <Text style={styles.title(colors)}>Crea tu cuenta</Text>
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
      {isLoginError && (
        <View style={styles.loginErrorZone}>
          <Text style={styles.loginErrorText(colors)}>
            Error: El usuario que intentas crear ya existe, elije otro email.
          </Text>
        </View>
      )}
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
  container: (colors) => {
    return {
      flex: 1,
      backgroundColor: colors.bgPrimary,
      alignItems: "center",
      paddingBottom: 10,
    };
  },
  title: (colors) => {
    return {
      color: colors.textPrimary,
      fontFamily: fonts.robotoBold,
      fontSize: 20,
      marginTop: 10,
    };
  },
  loginErrorZone: {
    height: 40,
    width: "80%",
  },
  loginErrorText: (colors) => {
    return {
      textAlign: "center",
      color: colors.bgWarning,
    };
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
