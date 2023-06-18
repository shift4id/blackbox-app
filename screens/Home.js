import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import ButtonBox from "../components/ButtonBox";
import { screenHeight, screenWidth } from "../styles/CommonStyles";
import Modal from "react-native-modal";
import * as Haptics from "expo-haptics";
import { Timer } from "react-native-stopwatch-timer";
import { Audio } from "expo-av";
import axios from "axios";

const Home = () => {
  const emotions = [
    { name: "Happy", percentage: 70 },
    { name: "Stress", percentage: 20 },
    { name: "Calm", percentage: 10 },
  ];

  const spheres = [{ name: "Gym" }, { name: "Friends" }, { name: "School" }];

  const [isModalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const [recording, setRecording] = useState();
  const [emotion, setEmotion] = useState(false);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setResetTimer(false);
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);

      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  const finishRecording = (uri) => {
    alert("Do you want to submit the audio recording?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("OK Pressed");
          sendAudioFile(uri);
        },
      },
    ]);
  };

  async function stopRecording() {
    console.log("Stopping recording..");
    setResetTimer(true);
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = await recording.getURI();
    console.log("Recording stopped and stored at", uri);

    finishRecording(uri);
  }

  floatingButtonClicked = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsRecording((isRecording) => !isRecording);
    if (recording) {
      stopRecording();

      //setIsRecording(false);
      //setResetTimer(true);
    } else {
      startRecording();
      //setIsRecording(true);
      //setResetTimer(false);
    }
  };

  donePressed = () => {
    setModalVisible(false);
    //sendText()
  };

  sendText = async () => {
    const baseUrl = "";
    try {
      const response = await axios.post(`${baseUrl}/api/text`, {
        text: input,
      });

      if (response.status === 201) {
        console.log(` You have created: ${JSON.stringify(response.data)}`);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      console.log(error);
    }
  };

  const sendAudioFile = async (uri) => {
    const formData = new FormData();
    formData.append("audio", { uri, name: "recording", filetype: "audio/m4a" });

    const baseUrl = "";
    try {
      const response = await axios.post(`${baseUrl}/audio/upload`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      if (response.status === 201) {
        console.log(` You have created: ${JSON.stringify(response.data)}`);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      setIsLoading(false);
    }
  };

  modalButtonClicked = () => {
    setInput("");
    setModalVisible(true);
  };

  closeModal = () => {
    setInput("");
    setModalVisible(false);
  };

  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <Text style={styles.headingText}>Welcome Iki,</Text>
        <Text style={styles.headingText}>How has your day been so far?</Text>

        <TouchableOpacity onPress={modalButtonClicked}>
          <ButtonBox
            title={"Add a thought!"}
            subtitle={"What is on your mind?"}
          />
        </TouchableOpacity>

        {emotion ? (
          <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={{ fontSize: 22, fontWeight: "600" }}>Analysis</Text>
            </View>

            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flexDirection: "column", flex: 1 }}>
                <View style={styles.boxHeader}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      textDecorationStyle: "solid",
                      textDecorationLine: "underline",
                    }}
                  >
                    Spheres
                  </Text>
                </View>
                {spheres.map((sphere, index) => (
                  <View style={styles.boxList}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {sphere.name}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={{ flexDirection: "column", flex: 1 }}>
                <View style={styles.boxHeader}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      textDecorationStyle: "solid",
                      textDecorationLine: "underline",
                    }}
                  >
                    Emotions
                  </Text>
                </View>
                {emotions.map((emotion, index) => (
                  <View style={styles.boxList}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {emotion.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => floatingButtonClicked()}
          style={styles.floatingButton}
        >
          {isRecording ? (
            <Image
              source={require("../assets/stop.png")}
              style={{
                resizeMode: "contain",
                width: 48,
                height: 48,
                borderRadius: 10,
              }}
            />
          ) : (
            <Image
              source={require("../assets/mic.png")}
              style={{
                resizeMode: "contain",
                width: 48,
                height: 48,
                borderRadius: 10,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.timerText}>
          <Timer
            totalDuration={120000}
            start={recording ? true : false}
            options={styles.timerText}
            reset={resetTimer}
            handleFinish={() => {
              stopRecording();
            }}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        backdropTransitionOutTiming={0}
        onDismiss={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 15,
            }}
          >
            <TouchableOpacity onPress={() => closeModal()}>
              <Image
                source={require("../assets/cross.png")}
                style={styles.crossButton}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={donePressed}>
              <Text style={styles.doneButton}>Done</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Type your thoughts..."
            value={input}
            multiline={true}
            maxLength={281}
            style={styles.textInput}
            onChangeText={(value) => setInput(value)}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    width: 80,
    height: 80,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    bottom: 50,
    backgroundColor: "#34E0A1",
    borderRadius: 40,
    shadowOpacity: 0.4,
    elevation: 4,
    shadowRadius: 10,
    shadowOffset: { width: 0.5, height: 5 },
  },
  timerText: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    bottom: 15,
    color: "grey",
  },
  headingText: {
    fontSize: 40,
    fontWeight: "700",
    marginHorizontal: 25,
    marginVertical: 10,
  },
  modal: {
    margin: 0,
    backgroundColor: "white",
    height: 0.8 * screenHeight,
    flex: 1,
    bottom: 0,
    position: "absolute",
    width: "100%",
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    //alignItems: "center",
    //justifyContent: "center",
    shadowOpacity: 0.7,
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 5 },
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  doneButton: {
    alignSelf: "flex-end",
    fontWeight: "600",
    fontSize: 18,
    color: "#34E0A1",
  },
  crossButton: {
    alignSelf: "flex-start",
    height: 25,
    width: 25,
  },
  textInput: {
    marginHorizontal: 30,
    marginTop: 20,
    fontSize: 18,
  },
  boxHeader: {
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    height: 40,
    marginHorizontal: 25,
    borderRadius: 5,
    alignSelf: "stretch",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginVertical: 5,
  },
  boxList: {
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    height: 20,
    marginHorizontal: 25,
    borderRadius: 5,
    alignSelf: "stretch",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginVertical: 3,
  },
  boxContainer: {
    borderRadius: 20,
    shadowOpacity: 0.4,
    elevation: 3,
    shadowRadius: 5,
    shadowOffset: { width: 0.5, height: 3 },
    backgroundColor: "white",
    height: screenHeight / 3,
    //width: screenWidth ,
    marginVertical: 20,
    backgroundColor: "white",
    marginHorizontal: 20,
  },
});

export default Home;
