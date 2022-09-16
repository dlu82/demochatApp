import {StyleSheet, LogBox} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Navigations from './src/navigations/index';
const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigations />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
