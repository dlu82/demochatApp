import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {TransitionSpecs} from '@react-navigation/stack';
import Navigations from './navigations';
import InitialScreen from '../screens/InitialScreen';
import SignUp from '../screens/SignUpScreen';
import Login from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';

const index = () => {
  const Stack = createStackNavigator();

  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
        initialRouteName={Navigations.initial}>
        <Stack.Screen name={Navigations.initial} component={InitialScreen} />
        {/* <Stack.Screen name={Navigations.initial} component={Login} /> */}
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="chat" component={ChatScreen} />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default index;

const styles = StyleSheet.create({});
