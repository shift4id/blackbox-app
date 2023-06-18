import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { Audio } from "expo-av";

const assets = [
    require("../assets/Hello0.mp3"),
    require("../assets/Hello1.mp3"),
    require("../assets/Hello2.mp3"),
  ];

const AudioThoughtBox = (props) => {

    const [sound, setSound] = useState()

  async function playAudioThought(index) {
    console.log("Play audio");
    const { sound } = await Audio.Sound.createAsync(assets[index]);
    setSound(sound);
    await sound.playAsync();
  }

//   useEffect(() => {
//     console.log("use effect");
//     if (sound) sound.unloadAsync();
//     return sound
//       ? () => {
//           console.log("Unloading Sound");
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

  return (
    <TouchableNativeFeedback
      onPress={() => props.playAudioThought(props.index)}
    >
      <View style={styles.dottedBox}>
        <View style={{ flexDirection: "col" }}>
          <Text>{props.title}</Text>
        </View>
        <Image source={require("../assets/play.png")} style={styles.addImage}></Image>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  dottedBox: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    height: 70,
    marginHorizontal: 25,
    borderRadius: 5,
    alignSelf: "stretch",
    justifyContent: "space-between",
    backgroundColor: "#F7F7F7",
    marginVertical: 5,
  },
  addImage: {
    height: 25,
    width: 25,
  },
});

export default AudioThoughtBox;
