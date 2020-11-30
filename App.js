import * as React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

function HomeScreen({navigation}) {
  return (
     <View style={{ flex: 1, alignItems:
           'center', justifyContent: 'center' }}>
        <Text style={{fontSize:30}}>The Essential Shop</Text>
        <Text>{'\n'}</Text>
        <Button
           title="Search"
           color="#841584"
           onPress={() =>
           <Tab.Screen name="Search" component={SearchScreen} />
         }/>
     </View>
  );
}

function SearchScreen() {
     return (
	<View style={{ flex: 1, alignItems:
		'center', justifyContent: 'center' }}>
		<Text>Search Screen</Text>
	</View>
     );
}

function UserScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Screen</Text>
    </View>
  );
}

function LocalProductsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Local Products Screen</Text>
    </View>
  );
}

function CartScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cart Screen</Text>
      <Button
        title="Return to Home"
        color="#841584"
        onPress={() =>
            <Tab.Screen name="Home" component={HomeScreen} />
        }/>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
    	<Stack.Screen name="The Essential Shop" component={HomeScreen} />
    	<Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'User') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'LocalProducts') {
              iconName = focused ? 'ios-help-circle' : 'ios-help-circle-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'ios-help-circle' : 'ios-help-circle-outline';
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="User" component={UserScreen} />
        <Tab.Screen name="LocalProducts" component={LocalProductsScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});
