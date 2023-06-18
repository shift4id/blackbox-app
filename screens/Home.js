import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import ButtonBox from "../components/ButtonBox"
import { screenHeight, screenWidth } from '../styles/CommonStyles';
import Modal from 'react-native-modal';
import * as Haptics from 'expo-haptics';
import { Timer } from 'react-native-stopwatch-timer';
import { Audio } from 'expo-av';

const Home = () => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState("");
    
    const [isRecording, setIsRecording] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const [duration, setDuration] = useState(120000);

    const [recording, setRecording] = useState();

    
    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }  

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        })
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    } 
    

    floatingButtonClicked = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        if (isRecording == true) {
            stopRecording().then(() => {
                setIsRecording(false);
                setResetTimer(true);
            })
        } else {
            startRecording().then(() => {
                setIsRecording(true);
                setResetTimer(false);
            })
        }
    }

    modalButtonClicked = () => {
        setModalVisible(true)
    }

    return(
        <>
        <View style={{backgroundColor: 'white', flex: 1}}>
            <Text style={styles.headingText}>Welcome Iki,</Text>
            <Text style={styles.headingText}>How has your day been so far?</Text>
            
            <TouchableOpacity onPress={modalButtonClicked}>
            <ButtonBox title={'Add a thought!'} subtitle={'What is on your mind?'}/>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} onPress={() => floatingButtonClicked()} style={styles.floatingButton} >
                {isRecording ? 
                <Image source={require('../assets/stop.png')} 
                style={{resizeMode: 'contain',
                width: 48,
                height: 48, borderRadius: 10}} />
                :
                <Image source={require('../assets/mic.png')} 
                    style={{resizeMode: 'contain',
                    width: 48,
                    height: 48, borderRadius: 10}} />
                }
            </TouchableOpacity>
            <View style={styles.timerText}>
            <Timer
            totalDuration={duration}
            start={isRecording}
            options={styles.timerText}
            reset={resetTimer}
            handleFinish={() => {
                //stopRecording();
            }}
            />
          </View>
            

            
        </View>
        <Modal animationType="slide" 
            transparent visible={isModalVisible} 
            //presentationStyle="overFullScreen" 
            //style={styles.modalBackground}
            onBackdropPress = {() => {
                setModalVisible(false)
            }}
            backdropTransitionOutTiming= {0}
            onDismiss={()=> setModalVisible(false)}
        >
                <View style={styles.modal}>
                    <Image source={require('../assets/cross.png')} style={styles.crossButton}/>
                    <TextInput placeholder="Type your thoughts..." 
                        value={input} 
                        multiline={true}
                        style={styles.textInput} 
                        onChangeText={(value) => setInput(value)} />
                </View>
          

        </Modal>
    </>
    )
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        width: 80,
        height: 80,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: 50,
        backgroundColor: '#34E0A1',
        borderRadius: 40,
        shadowOpacity: 0.4,
        elevation: 4,
        shadowRadius: 10 ,
        shadowOffset : { width: 0.5, height: 5},
    },
    timerText: {
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        bottom: 15,
        color: 'grey'
    },
    headingText: {
        fontSize: 40,
        fontWeight: '700',
        marginHorizontal: 25,
        marginVertical: 10
    },
    modal: {
        margin: 0, 
        backgroundColor: "white", 
        height: 0.8 * screenHeight,
        flex:1, 
        bottom: 0, 
        position: 'absolute',
        width: '100%',
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 25,
        //alignItems: "center",
        //justifyContent: "center",
        shadowOpacity: 0.7,
        shadowRadius: 20 ,
        shadowOffset : { width: 1, height: 5},
        elevation: 5
    },
    modalBackground: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    crossButton: {
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 10,
        height: 30,
        width: 30
    },
    textInput: {
        marginHorizontal: 30,
        marginTop: 20,
        fontSize: 18
    }
})

export default Home;




// const [time, setTime] = useState({min: 0, sec: 0})
    // const [seconds, setSeconds] = useState(120)
    // const [isRecording, setIsRecording] = useState(false)

    // useEffect(() => {
    //     if (!isRecording | seconds <= 0) {
    //         setTime({min: 0, sec: 0})
    //         setSeconds(120);
    //     }
    //     const timerId = setInterval(() => {
    //         setSeconds((seconds) => seconds - 1)
    //     }, 1000)

    //     return () => {
    //         clearInterval(timerId);
    //         setIsRecording(!isRecording)
    //       };
    // }, [isRecording])

    // useEffect(() => {
    //     if (seconds == 0) {
    //         setIsRecording(!isRecording)
    //         setTime({min: 0, sec: 0})
    //     } else {
    //         let min = Math.floor(seconds / 60)
    //         let sec = seconds % 60
    //         setTime({min: min, sec: sec})
    //     }
    // }, [seconds])