import React from 'react';
import {View, StyleSheet, Image, Text, TouchableNativeFeedback} from 'react-native';

const ThoughtBox = (props) => {

    boxClicked = () => {

    }

    return (
        <TouchableNativeFeedback onPress={() => boxClicked()}>
        <View style={styles.dottedBox}>
            <View style={{flexDirection: 'col'}}>
                <Text>{props.title}</Text>
            </View>
            {/* <Image source={require("../assets/add-icon.png")} style={styles.addImage}></Image> */}
        </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    dottedBox: {
        flexDirection: 'row',
        borderRadius: 20,                
        padding: 15,
        alignItems: 'center',
        height: 70,
        marginHorizontal: 25,
        borderRadius: 5,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        marginVertical: 5
    },
    addImage: {
        height: 25,
        width: 25
    }

})

export default ThoughtBox;