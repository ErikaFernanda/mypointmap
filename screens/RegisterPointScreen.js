import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

export default function RegisterPointScreen({ navigation }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const setCoordinate = (e) => {
    setLatitude(e.nativeEvent.coordinate.latitude);
    setLongitude(e.nativeEvent.coordinate.longitude);
  };

  function registerLocation() {
    fetch("https://mobile.ect.ufrn.br:3003/markers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF",
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        title: title,
        description: description,
      }),
    })
      .then((resp) => {
        console.log(resp.status);
        if (resp.ok) {
          setTitle("");
          setDescription("");
          alert("localização cadastrada com sucesso!");
        } else {
          alert("algo de errado aconteceu, revise os dados inseridos!");
        }
      })
      .catch((err) =>
        alert("algo de errado aconteceu, revise os dados inseridos!")
      );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={setCoordinate}>
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={title}
          description={description}
        />
      </MapView>
      <View style={styles.container_register}>
        <TextInput
          style={styles.input}
          placeholder="Titulo"
          onChangeText={(e) => setTitle(e)}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          onChangeText={(e) => setDescription(e)}
          value={description}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          editable={false}
          value={"latitude: " + latitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          editable={false}
          value={"longitude: " + longitude}
        />
        <View style={{flexDirection:"row",justifyContent:'space-around'}}>
          <TouchableOpacity
            style={styles.button_add}
            onPress={registerLocation}
          >
            <Text style={{ color: "white" }}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_add}
            onPress={() => navigation.navigate("Mapa")}
          >
            <Text style={{ color: "white" }}>Ver pontos</Text>
          </TouchableOpacity>
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

  container_register: {
    justifyContent: "center",
    backgroundColor: "white",
    opacity: 0.9,
    width: 300,
    margin: 30,
    borderRadius: 25,
  },
  input: {
    // height: 40,
    margin: 10,
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
  button_add: {
    alignItems: "center",
    backgroundColor: "#96daff",
    padding: 10,
    borderRadius: 25,
    height: 40,
    width:130,
    margin: 10,
  },
});
