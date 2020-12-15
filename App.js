import React,{useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, Image, Button, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableWithoutFeedback} from "react-native-web";

let exampleItems=[
  {
    name:'Eggs',
    description:'12 Count Large',
    price: 1.99,
  },
  {
    name:'Milk',
    description:'1 Gallon - 2%',
    price: 2.99,
  },
  {
    name:'AirPods',
    description:'Wireless Earbuds',
    price: 149.99,
  }
]

let cartItems = [
  {name:'Cart Test',
    description:'Description',
    price: 4.99,}
]

let localProductItems=[
    {
      name:'Raw Honey',
      description:'12oz Bottle',
      price: 6.99,
    },
    {
      name:'Strawberries',
      description:'2lb container',
      price: 7.99,
    },
    {
      name:'Apples',
      description:'single count',
      price: 0.99,
    }
]

const CharDisplay = char =>{
      return (
        <View style={{ alignItems:'left', justifyContent: 'left', backgroundColor: 'grey', marginLeft: 20, marginRight: 20}} >
          <Text>{char.item.name}            {char.item.price}</Text>
          <Text>{char.item.description}</Text>
          <Text onPress={()=>toCart(char.item)} style={{color: 'white'}}>Send to Cart</Text>
          <Text>{"\n"}</Text>
        </View>)
  }

const CharDisplay2 = char =>{
      return (
        <View style={{ alignItems:'left', justifyContent: 'left', backgroundColor: 'grey', marginLeft: 20, marginRight: 20}} >
          <Text>{char.item.name}            {char.item.price}</Text>
          <Text>{char.item.description}</Text>
          <Text onPress={()=>rmFromCart(char.item)} style={{color: 'white'}}>Return</Text>
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

function UserScreen({navigation}) {
        return (
            <View style={styles2.container}>
                <View style={styles2.header}>
                    <View style={styles2.headerContent}>
                        <Image style={styles2.avatar}
                               source={{uri: 'https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png'}}/>
                        <Text style={styles2.name}>John Doe </Text>
                        <Text style={styles2.userInfo}>JohnDoe@mail.com </Text>
                        <Text style={styles2.userInfo}>Ithaca, NY </Text>
                    </View>
                </View>
                <View style={styles2.body}>
                    {/*<TouchableHighlight onPress={() => navigation.navigate('User')} activeOpacity={0.6} underlayColor='blue'>*/}
                        <View style={styles2.item}>
                            <View style={styles2.iconContent}>
                                <Image style={styles2.icon} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png'}}/>
                            </View>
                            <View style={styles2.infoContent}>
                                <Text style={styles2.info}>Edit Profile</Text>
                            </View>
                        </View>
                    {/*</TouchableHighlight>*/}
                </View>
            </View>
        );
}

function LocalProductsScreen() {
  const [searchedLocalProducts, setSearchedLocalProducts] = useState("Enter search term");
  const [searchLocalList, setSearchLocalList] = useState(localProductItems.slice())
  const listGen = () =>{
     let returnable = [];
     var i;
     for(i = 0; i < localProductItems.length; i++){
       if(localProductItems[i].name==searchedLocalProducts || localProductItems[i].description==searchedLocalProducts){
           returnable.push(localProductItems[i]);
        }
     }
       setSearchLocalList(returnable);
     }
    return (
  	<View style={{ flex: 1, alignItems:
  		'center', justifyContent: 'center' }}>
  		<Text>Search Local Products</Text>
      <Text>{'\n'}</Text>
      <TextInput
  	     style={styles.fieldStyle}
  	     onChangeText={(searchedLocalProducts)=>setSearchedLocalProducts(searchedLocalProducts)}
  	     value={searchedLocalProducts}/>
         <TouchableHighlight
             onPress={() => listGen()}
             activeOpacity={0.6}
             underlayColor='blue'
             >
             <Text style={styles.openButton}>Enter</Text>
             </TouchableHighlight>
      <FlatList
          data={searchLocalList}
          renderItem={CharDisplay}
        />
  	</View>
       );
}

function CartScreen() {
  const [cartList, setCartList] = useState(cartItems.slice())
  const [total, setTotal] = useState(calcTotal(cartItems))
  function checkout(){
    cartItems.splice(0)
    setCartList(cartItems.slice())
    setTotal(calcTotal(cartItems))
    }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cart Screen</Text>
      <FlatList
        data={cartItems}
        renderItem={CharDisplay2}
      />
      <Text>Total: {total}</Text>
      <TouchableHighlight
           onPress={() => checkout()}
           activeOpacity={0.6}
           underlayColor='blue'
           >
           <Text style={styles.openButton}>Checkout</Text>
           </TouchableHighlight>
    </View>
  );
}

function toCart(item){
    cartItems.push(item)
    var i;
    for(i = 0; i < exampleItems.length; i++){
      if(exampleItems[i].name == item.name){
        exampleItems.splice(i,1)
      }
    }
    //calcTotal(cartItems)
}

function rmFromCart(item){
  exampleItems.push(item)
  var i;
    for(i = 0; i < cartItems.length; i++){
      if(cartItems[i].name == item.name){
        cartItems.splice(i,1)
      }
    }
}

function calcTotal(list){
  var total=0
  for(var i = 0; i < list.length; i++){
    total=total+list[i].price
  }
  return total
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

const styles2 = StyleSheet.create({
    header:{
        backgroundColor: "#DCDCDC",
    },
    headerContent:{
        padding:30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
    },
    name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
    },
    body:{
        backgroundColor: "#778899",
        height:500,
        alignItems: 'center',
    },
    item:{
        flexDirection : 'row',
    },
    infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
    },
    iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
    },
    icon:{
        width:30,
        height:30,
        marginTop:20,
    },
    info:{
        fontSize:18,
        marginTop:20,
        width: 90,
        color: "#FFFFFF",
    }
});