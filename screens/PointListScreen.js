import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react/cjs/react.development";

export default function PointListScreen() {
  const [latitude, setLatitude] = useState(220);
  const [longitude, setLongitude] = useState(220);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const setCoordinate = (e) => {
    setLatitude(e.nativeEvent.coordinate.latitude);
    setLongitude(e.nativeEvent.coordinate.longitude);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={setCoordinate}>
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={title}
          description={description}
        />
      </MapView>
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <View style={styles.button_register}>
          
          <Ionicons name="add-circle" size={80} color="green" />
    
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
    backgroundColor: "white",
    width: 75,
    height: 75,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    margin:20,
  },
});
