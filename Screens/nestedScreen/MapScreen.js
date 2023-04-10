import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function MapScreen({ route }) {
  const { longitude, latitude } = route.params.location;
  console.log(longitude);
  console.log(latitude);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Твоя локация" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
