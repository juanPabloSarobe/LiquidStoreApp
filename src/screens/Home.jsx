import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshLoginMutation } from "../app/services/auth";
import Categories from "../components/Categories";
import RefreshLoginModal from "../components/RefreshLoginModal";
import WelcomeModal from "../components/WelcomeModal";
import { getUser } from "../features/auth/authSlice";
import { deleteSession, fetchSession, insertSession } from "../utils/db";

const Home = ({ navigation }) => {
  const colors = useSelector((state) => state.colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshModalVisible, setRefreshModalVisible] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [lastSessionData, setlastSessionData] = useState({});
  const [newSessionData, setNewSessionData] = useState({});
  const [triggerRefreshLogin] = useRefreshLoginMutation();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const session = await fetchSession();

      setlastSessionData(session.rows._array[0]);
      if (session.rows.length) {
        const now = Math.floor(Date.now() / 1000);
        const updateAt = session.rows._array[0].updateAt;
        const sessionTime = now - updateAt;

        setRefreshToken(session?.rows._array[0].refreshToken);
        console.log("session: ", session.rows._array[0].updateAt);

        if (sessionTime > 30) {
          console.log(sessionTime);
          setRefreshModalVisible(true);
        }
      } else {
        setModalVisible(true);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (Object.keys(newSessionData).length) {
        console.log("newSessionData: ", newSessionData);
        deleteSession();
        insertSession(newSessionData);
        const sessionRefreshed = await fetchSession();
        console.log(
          "sessionRefreshed: ",
          await sessionRefreshed.rows._array[0]
        );

        dispatch(
          getUser({
            email: sessionRefreshed.email,
            idToken: sessionRefreshed.idToken,
            displayName: sessionRefreshed.displayName,
            localId: sessionRefreshed.localId,
          })
        );
      }
    })();
  }, [newSessionData]);
  console.log("LastSessionData:", lastSessionData);

  const handleModal = ({ visible }) => {
    setModalVisible(visible);
  };
  const closeRefreshLoginModal = ({ visible }) => {
    setRefreshModalVisible(visible);
  };

  const handleRefreshLoginModal = async ({ visible }) => {
    setRefreshModalVisible(visible);

    const { data, error } = await triggerRefreshLogin({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    setNewSessionData({
      displayName: lastSessionData.displayName,
      email: lastSessionData.email,
      idToken: data.id_token,
      localId: data.user_id,
      refreshToken: data.refresh_token,
    });

    console.log("RefreshData: ", data);

    if (error) {
      console.log(error);
      //setIsLoginError(true);
    }
  };
  if (modalVisible && !refreshToken) {
    return <WelcomeModal isVisible={modalVisible} handleModal={handleModal} />;
  }
  if (refreshToken && refreshModalVisible) {
    return (
      <RefreshLoginModal
        isVisible={refreshModalVisible}
        handleRefreshLoginModal={handleRefreshLoginModal}
        closeRefreshLoginModal={closeRefreshLoginModal}
      />
    );
  }
  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
        <Categories navigation={navigation} />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
  },
});
