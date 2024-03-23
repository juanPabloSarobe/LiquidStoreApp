import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("sessions3.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sessionUser (localId TEXT NOT NULL,email TEXT NOT NULL,idToken TEXT NOT NULL,displayName TEXT NOT NULL,refreshToken TEXT NOT NULL, updateAt INTEGER )",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
  return promise;
};
export const eraseTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS sessionUser;",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
  return promise;
};
export const show = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sqlite_master WHERE type = 'table';",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
  return promise;
};

export const insertSession = ({
  localId,
  email,
  idToken,
  displayName,
  refreshToken,
}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO sessionUser (localId,email,idToken,displayName,refreshToken,updateAt) VALUES (?,?,?,?,?,strftime('%s', 'now'))",
        [localId, email, idToken, displayName, refreshToken],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
  return promise;
};

export const fetchSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sessionUser",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
  return promise;
};

export const deleteSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM sessionUser",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(result)
      );
    });
  });
  return promise;
};
