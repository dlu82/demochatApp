import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {TransitionSpecs} from '@react-navigation/stack';
import Navigations from './navigations';
import InitialScreen from '../screens/InitialScreen';
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
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default index;

const styles = StyleSheet.create({});
