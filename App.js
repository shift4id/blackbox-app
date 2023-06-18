import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Thoughts from './screens/Thoughts';
import Trends from './screens/Trends';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Dashboard' screenOptions={{tabBarActiveTintColor: '#34E0A1'}}>
        <Tab.Screen name="Trends" component={Trends} options= {{tabBarIcon : () => {return <Image source={require("./assets/trends.png")} style={styles.tabIconStyle}></Image>}}}/>
        <Tab.Screen name="Dashboard" component={Home} options= {{tabBarIcon : () => {return <Image source={require("./assets/dashboard.png")} style={styles.tabIconStyle}></Image>}}}/>
        <Tab.Screen name="Thoughts" component={Thoughts} options= {{tabBarIcon : () => {return <Image source={require("./assets/thoughts.png")} style={styles.tabIconStyle}></Image>}}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconStyle: {
    width: 20,
    height: 20
  }
});
