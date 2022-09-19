import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import styles from './style';
const index = ({
  label,
  btnStyle,
  txtStyle,
  tapOn,
  isLoading,
  indicatorColor,
}) => {
  return (
    <TouchableOpacity
      onPress={() => tapOn()}
      style={{...styles.Button, ...btnStyle}}>
      <Text style={{...styles.text, ...txtStyle}}>{label}</Text>
      {isLoading && (
        <ActivityIndicator
          color={indicatorColor}
          size={'small'}
          style={{marginLeft: 5}}
        />
      )}
    </TouchableOpacity>
  );
};

export default index;
