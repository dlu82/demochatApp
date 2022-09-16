import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CustomComponentView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    marginHorizontal: 16,
    marginTop: 20,
  },
  nameView: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 19,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
export default styles;
