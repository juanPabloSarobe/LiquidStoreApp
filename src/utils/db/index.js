import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("session.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
};

export const insertSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
};
export const fetchSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
};
export const deleteSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
};

/* 
    tx.executeSql(
                '', consulta
                [], valores que le paso a la consulta
                (_, result) => resolve(result), funcion que ejecuta cuando la consulta es exitosa
                (_, result) => reject(result), funcion que se ejecuta cuando la consulta da eror

            ) */
