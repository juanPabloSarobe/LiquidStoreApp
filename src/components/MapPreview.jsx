import { Image, StyleSheet, Text, View } from "react-native";

const MapPreview = ({ latitude, longitude }) => {
  const mapsKey = process.env.EXPO_PUBLIC_MAPS_KEY;
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}
  &zoom=13
  &size=600x300
  &maptype=roadmap
  &markers=color:red%7C${latitude},${longitude}
  &key=${mapsKey}`;

  return (
    <View>
      <Image
        source={
          latitude ? { uri: mapPreviewUrl } : require("../../assets/map.jpg")
        }
        style={styles.image}
      />
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});
