import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useLoginMutation } from "../app/services/auth";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import fonts from "../utils/global/fonts";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/counter/counterSlice";
import { loginSchema } from "../utils/validations/authSchema";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [triggerLogin] = useLoginMutation();
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.colors);
  const onSubmit = async () => {
    try {
      loginSchema.validateSync({ email, password });
      const { data } = await triggerLogin({
        email,
        password,
      });
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
