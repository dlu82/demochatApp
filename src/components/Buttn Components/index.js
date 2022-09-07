import React from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import styles from './style';
const index = ({label, btnStyle, txtStyle, tapOn}) => {
  return (
    <TouchableOpacity
      onPress={() => tapOn()}
      style={{...styles.Button, ...btnStyle}}>
      <Text style={{...styles.text, ...txtStyle}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default index;
