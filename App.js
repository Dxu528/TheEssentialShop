import React,{useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, Image, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

let exampleItems=[
  {
    name:'Product A',
    description:'Description',
    price:'Price',
  },
  {
    name:'Product B',
    description:'Description',
    price:'Price',
  },
  {
    name:'Product C',
    description:'Description',
    price:'Price',
  }
]

const CharDisplay = char =>{
      return (
        <View style={{ alignItems:'left', justifyContent: 'left', backgroundColor: 'grey', marginLeft: 20, marginRight: 20}} >
          <Text>{char.item.name}            {char.item.price}</Text>
          <Text>{char.item.description}</Text>
          <Text>{"\n"}</Text>
        </View>)
  }

function HomeDetailsScreen({navigation}) {
  return (
     <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{fontSize:30}}>The Essential Shop</Text>
        <Text>{'\n'}</Text>
        <TouchableHighlight
           onPress={() => navigation.navigate('Search')}
           activeOpacity={0.6}
           underlayColor='blue'
           >
           <Text style={styles.openButton}>Search</Text>
           </TouchableHighlight>
           <Text>{'\n'}</Text>
           <Text style={{alignItems:'left'}}>Featured Products</Text>
           <FlatList
        data={exampleItems}
        renderItem={CharDisplay}
      />
     </View>
  );
}

function SearchScreen() {
    const [searched, setSearched] = useState("Enter search term");
    const [searchList, setSearchList] = useState(exampleItems.slice())
    const listGen = () =>{
      let returnable = [];
      var i;
      for(i = 0; i < exampleItems.length; i++){
        if(exampleItems[i].name==searched || exampleItems[i].description==searched){
          returnable.push(exampleItems[i]);
        }
      }
      setSearchList(returnable);
    }
     return (
	<View style={{ flex: 1, alignItems:
		'center', justifyContent: 'center' }}>
		<Text>Search Screen</Text>
    <Text>{'\n'}</Text>
    <TextInput
	     style={styles.fieldStyle}
	     onChangeText={(searched)=>setSearched(searched)}
	     value={searched}/>
       <TouchableHighlight
           onPress={() => listGen()}
           activeOpacity={0.6}
           underlayColor='blue'
           >
           <Text style={styles.openButton}>Enter</Text>
           </TouchableHighlight>
    <FlatList
        data={searchList}
        renderItem={CharDisplay}
      />
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
    </View>
  );
}

const Stack = createStackNavigator();

function HomeScreen() {
    return (
        <Stack.Navigator initialRouteName="Home">
	        <Stack.Screen name="The Essential Shop" component={HomeDetailsScreen} />
	        <Stack.Screen name="Search" component={SearchScreen} />
		</Stack.Navigator>
     );
}

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-home'
                      : 'ios-home';
                  } else if (route.name === 'User') {
                    iconName = focused ? 'ios-person' : 'ios-person';
                  } else if (route.name === 'Local Products') {
                    iconName = focused ? 'ios-basket' : 'ios-basket';
                  } else if (route.name === 'Cart') {
                    iconName = focused ? 'ios-cart' : 'ios-cart';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
              }}
                >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="User" component={UserScreen} />
              <Tab.Screen name="Local Products" component={LocalProductsScreen} />
              <Tab.Screen name="Cart" component={CartScreen} />
            </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});