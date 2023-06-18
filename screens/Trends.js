import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native';
import { screenHeight, screenWidth } from '../styles/CommonStyles';


const Trends = () => {

  const [isActive, setActive] = useState(0)
  const flatListRef = [React.createRef()];

  const data = [ 
    { 
      name: 'Boxing', 
      emotions: [{name: 'Happy', percentage: 70}, {name: 'Stress', percentage: 20}, {name: 'Calm', percentage: 10}]
    },

    { 
      name: 'Classes', 
      emotions: [{name: 'Happy', percentage: 40}, {name: 'Stress', percentage: 80}]
    },

    { 
      name: 'Friends', 
      emotions: [{name: 'Happy', percentage: 80}, {name: 'Calm', percentage: 20}]
    },

    { 
      name: 'Reading', 
      emotions: [{name: 'Happy', percentage: 40}, {name: 'Calm', percentage: 60}]
    }
  ]

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length != 0) {
      setActive(viewableItems[0].index)
    }
  }
  
  const viewabilityConfigCallbackPairs = React.useRef([{
    viewabilityConfig: {
      minimumViewTime: 100,
      itemVisiblePercentThreshold: 100,
    },
    onViewableItemsChanged: onViewableItemsChanged
  }
]);

  renderSphereItem = ({ item, index }) => (
    <TouchableNativeFeedback onPress={() =>  {setActive(index)
      flatListRef[0].scrollToIndex({animated: true, index: index})
      }}>
    <View style={[styles.circleContainer, {borderColor: isActive == index ? 'black' : '#8CEECA'}]}>
      <Text style={{fontSize: 15, fontWeight: '600'}}>{item.name}</Text>
    </View>
    </TouchableNativeFeedback>
  )

  renderEmotionItem = ({ item, index }) => (
    <View style={styles.boxContainer}>
      <View style={[styles.dottedBox, {backgroundColor: 'white'}]}>
        <Text style={{fontSize: 28, fontWeight: '600'}}>{item.name}</Text>
      </View>
      {item.emotions.map((emotion, index) => (
        <View style={[styles.dottedBox, {backgroundColor: index==0 ? '#34E0A1' : '#F7F7F7', padding: 15}]}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>{emotion.name}</Text>
          <Text style={{fontSize: 18, fontWeight: '600'}}>{emotion.percentage}%</Text>
        </View>
      ))}
      
      
    </View>
  )

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View style = {styles.listView}>
            <FlatList 
                    data={data}  
                    renderItem={renderSphereItem}
                    horizontal
                    initialScrollIndex={0}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `${index}.${item.name}`}
                    /> 
            </View>

            <View style={styles.emotionsView}>
            <FlatList 
                    data={data}  
                    renderItem={renderEmotionItem}
                    horizontal
                    initialNumToRender={data.length}
                    ref={(ref) => { flatListRef[0] = ref; }}
                    initialScrollIndex={0}
                    snapToInterval={screenWidth - 20}
                    pagingEnabled
                    decelerationRate={0}
                    showsHorizontalScrollIndicator={false}

                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    keyExtractor={(item, index) => `${index}.${item.name}`}
                    /> 
            </View>
        </View>
    )

    
}

const styles = StyleSheet.create({
    circleContainer: {
      backgroundColor: '#8CEECA',
      borderRadius: 50,
      borderWidth: 2,
      height: 100,
      width: 100,
      marginHorizontal: 7,
      marginVertical: 10,
      shadowOpacity: 0.4,
      elevation: 3,
      shadowRadius: 5 ,
      shadowOffset : { width: 0.5, height: 3},
      alignItems: 'center',
      justifyContent: 'center',
    },
    listView: {
      marginTop: 20,
      width: '100%',
      height: 120,
      flexDirection: 'row',
      alignItems: 'center'
    }, 
    emotionsView: {
      marginTop: 20,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 10
    },
    boxContainer: {
      borderRadius: 20,
      shadowOpacity: 0.4,
      elevation: 3,
      shadowRadius: 5 ,
      shadowOffset : { width: 0.5, height: 3},
      backgroundColor: 'white',
      height: screenHeight/2,
      width: screenWidth - 40,
      marginVertical: 20,
      marginHorizontal: 10
    },
    dottedBox: {
      flexDirection: 'row',
      borderRadius: 20,                
      
      alignItems: 'center',
      height: 70,
      marginHorizontal: 25,
      borderRadius: 5,
      alignSelf: 'stretch',
      justifyContent: 'space-between',
     // backgroundColor: '',
      marginVertical: 5
  }
});

export default Trends;