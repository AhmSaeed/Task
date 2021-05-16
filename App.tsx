/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import makeRootReducer from './src/store/reducers';
import AppContainer from './src/AppContainer';
import createStore from './src/store/createStore';

declare global {
  interface Window { Namespace: any; }
}

//Using to get initial screen state instead of window.__INITIAL_STATE__
const initialState = window.Namespace || {};

//Using createStore function we created under store folder to provide our AppContainer with store and persistor for the store
const {store, persistor} =  createStore(initialState);

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <AppContainer store={store} persistor={persistor}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
