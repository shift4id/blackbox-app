import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BubbleChart } from 'react-native-charts-wrapper';

const Trends = () => {
    return (
        <View>
            <Text>Some spicy trends</Text>
            <BubbleChart></BubbleChart>
        </View>
    )
}

export default Trends;