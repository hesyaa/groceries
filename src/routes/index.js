import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Cart from '../screen/Cart';
import Profile from '../screen/Profile';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Cart':
      iconName = 'shoppingcart';
      break;
    case 'Profile':
      iconName = 'user';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

const Router = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingVertical: 8,
          height: 50,
        },
        tabBarLabelStyle: {fontSize: 10, marginBottom: 6},
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Cart" component={Cart} options={{headerShown: false}} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Router;
