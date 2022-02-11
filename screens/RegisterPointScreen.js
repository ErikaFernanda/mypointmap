import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react/cjs/react.development";

export default function RegisterPointScreen() {
  const [latitude, setLatitude] = useState(220);
  const [longitude, setLongitude] = useState(220);
  const [title,setTitle] = useState();
  const [description,setDescription] = useState();

  const setCoordinate = (e) => {
    setLatitude(e.nativeEvent.coordinate.latitude);
    setLongitude(e.nativeEvent.coordinate.longitude);
  };

  const registerLocation = () => {
    console.log(title)
    console.log(description)
    console.log(latitude)
    console.log(longitude)
    
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
      <View style={styles.container_register}>
        <TextInput style={styles.input} placeholder="Titulo" onChangeText={(e) => setTitle(e)} />
        <TextInput style={styles.input} placeholder="Descrição" onChangeText={(e) => setDescription(e)}/>
        <TextInput style={styles.input} placeholder="Latitude"  editable={false} value={"latitude: "+latitude}/>
        <TextInput style={styles.input} placeholder="Longitude" editable={false} value={"longitude: "+longitude} />
        <TouchableOpacity style={styles.button_add} onPress={registerLocation}>
          <Text style={{ color: "white" }}>Cadastrar</Text>
        </TouchableOpacity>
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
    margin: 10,
  },
});
