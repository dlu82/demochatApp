import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  createNativeStackNavigator,
} from '@react-navigation/stack';
import {TransitionSpecs} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import InitialScreen from '../screens/InitialScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ConvoScreen from '../screens/ConvoScreen';
import BottomNavigation from './BottomNavigation';

const index = () => {
  const Stack = createStackNavigator();
  const {data} = useSelector(state => state.firebaseStore);

  console.log(data);

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
        initialRouteName={'Loading'}>
        <Stack.Screen name={'Loading'} component={LoadingScreen} />
        <Stack.Screen name={'initial'} component={InitialScreen} />
        <Stack.Screen name="convo" component={ConvoScreen} />
        <Stack.Screen name="bottomNav" component={BottomNavigation} />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default index;

const styles = StyleSheet.create({});
