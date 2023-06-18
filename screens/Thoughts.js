import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from "react-native";
import ThoughtBox from "../components/ThoughtBox";
import { SelectMultipleButton } from "react-native-selectmultiple-button";
import AudioThoughtBox from "../components/AudioThoughtBox";
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from "expo-av";
const thoughts = [
  { name: "Thought number one", spheres: [true, false, true, false] },
  { name: "Thought number two", spheres: [false, true, true, true] },
  { name: "Thought number three", spheres: [false, false, false, true] },
];
const SPHERES = ["Gym", "Life", "Academics", "Friends"];

const assets = [
  require("../assets/Hello0.mp3"),
  require("../assets/Hello1.mp3"),
  require("../assets/Hello2.mp3"),
];

const Thoughts = (props) => {
  const [sound, setSound] = useState();
  const [spheres, setSpheres] = useState(
    SPHERES.map((val, id) => {
      return {
        name: val,
        sel: false,
        index: id,
      };
    })
  );
  const [load, setLoad] = useState(false);

  const thoughtFiltered = (thought, index) => {
    return thought.spheres.filter((s, i) => s && spheres[i].sel).length > 0;
  };

  async function playAudioThought(index) {
    console.log("Play audio");
    const { sound } = await Audio.Sound.createAsync(assets[index]);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    // if (sound) sound.unloadAsync();
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingTop: 5 }}>
      <View style={styles.filters}>
        <FlatList
          data={spheres}
          numColumns={spheres.length}
          keyExtractor={(sphere) => {
            return sphere.index;
          }}
          renderItem={({ item: item }) => {
            return (
              <SelectMultipleButton
                multiple={true}
                value={item.name}
                key={item.index}
                selected={item.sel}
                singleTap={() => {
                  spheres[item.index].sel = !spheres[item.index].sel;
                  console.log(spheres);
                  setSpheres(spheres);
                  setLoad(!load);
                }}
              />
            );
          }}
        />
      </View>

      {thoughts.map((thought, index) => {
        return (
          <ThoughtBox
            title={thought.name}
            subtitle={"What are you up to?"}
            key={index}
          />
        );
      })}
      {thoughts.map((thought, index) => {
        return thoughtFiltered(thought, index) ? (
          <AudioThoughtBox
            title={thought.name}
            playAudioThought={playAudioThought}
            subtitle={"What are you up to?"}
            key={index}
            index={index}
          />
        ) : null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    right: 50,
    bottom: 90,
  },
  filters: {
    flexDirection: "row",
    borderRadius: 20,
    // padding: 15,
    alignItems: "center",
    height: 70,
    marginHorizontal: 25,
    borderRadius: 5,
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 5,
  },
  playBtn: {
    padding: 20,
  },
});

export default Thoughts;
