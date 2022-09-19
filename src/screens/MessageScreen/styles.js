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
    paddingVertical: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 20,
  },
  nameView: {
    // marginLeft: 20,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
export default styles;
