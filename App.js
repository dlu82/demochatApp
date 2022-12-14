import React from 'react';
import {StyleSheet, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ToastProvider} from 'react-native-toast-notifications';

import Navigations from './src/navigations/index';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import FirebaseReducer from './src/store/index';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
// import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [''],
};

const persistedReducer = persistReducer(persistConfig, FirebaseReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(),
});

let persistor = persistStore(store);

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <ToastProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <Navigations />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </ToastProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
