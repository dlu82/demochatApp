import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import CallScreen from '../screens/CallScreen';

const BottomNavigation = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      backBehavior={'history'}
      initialRouteName={'Messages'}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#001f28',
          bottom: 20,
          marginHorizontal: 30,
          paddingBottom: 10,
          height: 70,
          borderRadius: 40,
          position: 'absolute',
        },
      }}>
      <BottomTab.Screen
        name="Call"
        component={CallScreen}
        options={{
          tabBarActiveTintColor: '#FAD02C',
          tabBarInactiveTintColor: 'grey',
          headerShown: false,
          tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
              name={focused ? 'call' : 'call-outline'}
              color={focused ? '#FAD02C' : 'grey'}
              size={25}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          tabBarActiveTintColor: '#FAD02C',
          tabBarInactiveTintColor: 'grey',
          headerShown: false,
          tabBarIcon: ({tintColor, focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'message-reply' : 'message-reply-outline'}
              color={focused ? '#FAD02C' : 'grey'}
              size={25}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarActiveTintColor: '#FAD02C',
          tabBarInactiveTintColor: 'grey',
          headerShown: false,
          tabBarIcon: ({tintColor, focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-settings'}
              color={focused ? '#FAD02C' : 'grey'}
              size={25}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;
