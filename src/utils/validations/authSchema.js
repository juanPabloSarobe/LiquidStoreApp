import { object, string, ref } from "yup";

export const registerSchema = object().shape({
  confirmPassword: string()
    .required("por favor intruduzcanuevamente el password")
    .oneOf([ref("password"), null], "El password no coincide"),
  password: string()
    .required("por favor introduzca un password")
    .min(6, "Minimo 6 caracteres")
    .max(12, "el password debe tener un maximo de 12 caracteres"),
  email: string()
    .required("por favor intruduzca un email")
    .email("No es un mail valido"),
  nombre: string()
    .required("Por favor introduzca un nombre Valido")
    .min(8, "Minimo 8 caracteres")
    .max(20, "El nombre no debe superar los 20 caracteres"),
});

export const loginSchema = object().shape({
  password: string()
    .required("por favor introduzca un password")
    .min(6, "Minimo 6 caracteres"),
  email: string()
    .required("por favor intruduzca un email")
    .email("No es un mail valido"),
});
