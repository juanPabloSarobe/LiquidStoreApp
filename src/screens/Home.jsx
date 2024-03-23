import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";
import WelcomeModal from "../components/WelcomeModal";

const Home = ({ navigation }) => {
  const colors = useSelector((state) => state.colors);
  const [modalVisible, setModalVisible] = useState(true);

  const handleModal = ({ visible }) => {
    setModalVisible(visible);
  };
  if (modalVisible) {
    return <WelcomeModal isVisible={modalVisible} handleModal={handleModal} />;
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
