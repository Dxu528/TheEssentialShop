import * as React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({navigation}) {
  return (
     <View style={{ flex: 1, alignItems:
           'center', justifyContent: 'center' }}>
        <Text style={{fontSize:30}}>Home Screen</Text>
        <Text>{'\n'}</Text>
        <TouchableHighlight
          onPress={() => navigation.navigate('Details')}
          activeOpacity={0.6}
          underlayColor='red'
        >
          <Text style={styles.openButton}>Go To Details</Text>
        </TouchableHighlight>

     </View>
  );
}

function DetailsScreen() {
     return (
	<View style={{ flex: 1, alignItems:
		'center', justifyContent: 'center' }}>
		<Text>Details Screen</Text>
	</View>
     );
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
			      <Stack.Screen name="The Essential Shop" component={HomeScreen} />
			      <Stack.Screen name="Details" component={DetailsScreen} />
		      </Stack.Navigator>

	      </NavigationContainer>
     );
}

export default App;

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});
