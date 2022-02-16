import { Ionicons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react/cjs/react.development";

export default function PointListScreen({ navigation }) {
  const [points, setPoints] = useState([]);

  async function fetchData() {
    const res = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
      headers: {
        Authorization: 'Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF',
      },
    });
    const markers = await res.json();

    setPoints(markers);
  }
  fetchData();

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
      {points.map((point) => (
          <Marker
            key={point.id}
            title={point.title}
            description={point.description}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
          >
          </Marker>
    ))}
      </MapView>
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <View style={styles.button_register}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Cadastro")}
          >
            <Ionicons name="add-circle" size={75} color="gray" />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
    flexDirection: "column-reverse",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
  },
  button_register: {
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 10,
  },
});
