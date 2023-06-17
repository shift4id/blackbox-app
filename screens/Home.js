import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonBox from "../components/ButtonBox"

const Home = () => {

    floatingButtonClicked = () => {

    }

    return(
        <View style={{backgroundColor: 'white'}}>
            <ButtonBox title={'Log an activity!'} subtitle={'What are you upto?'}/>
            <ButtonBox title={'Add a thought!'} subtitle={'What is on your mind?'}/>
            <ButtonBox title={'Add a sphere!'} subtitle={'Work on yourself'}/>

            <TouchableOpacity activeOpacity={0.5} onPress={() => floatingButtonClicked()} style={styles.floatingButton} >
 
                <Image source={require('../assets/add-icon.png')} 
                    style={{resizeMode: 'contain',
                    width: 48,
                    height: 48, borderRadius: 10}} />

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 90
    }
})

export default Home;