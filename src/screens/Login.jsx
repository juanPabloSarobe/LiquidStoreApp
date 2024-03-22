import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useLoginMutation } from "../app/services/auth";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import fonts from "../utils/global/fonts";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/auth/authSlice";
import { loginSchema } from "../utils/validations/authSchema";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [triggerLogin] = useLoginMutation();
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.colors);

  useEffect(() => {
    setIsLoginError(false);
    setIsLoading(false);
  }, [email, password]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      loginSchema.validateSync({ email, password });
      const { data, error } = await triggerLogin({
        email,
        password,
      });
      if (error) {
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
      setErrorEmail("");
      setErrorPassword("");

      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        default:
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container(colors)}>
      <View style={styles.submit}>
        <Text style={styles.title(colors)}>Inicio de Sesión</Text>
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
      {isLoginError && (
        <View style={styles.loginErrorZone}>
          <Text style={styles.loginErrorText(colors)}>
            Error: Usuario o password incorrecto
          </Text>
        </View>
      )}
      <View style={styles.submit}>
        <SubmitButton
          onPress={onSubmit}
          title="Iniciar Sesion"
          isLoading={isLoading}
        />
      </View>
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.register}>No tenes una cuenta?</Text>
      </Pressable>
    </View>
  );
};

export default Login;

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
    height: 20,
  },
  loginErrorText: (colors) => {
    return {
      color: colors.bgWarning,
    };
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
