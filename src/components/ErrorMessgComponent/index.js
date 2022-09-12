import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const index = ({msg}) => {
  return (
    <View style={{marginTop: 2}}>
      <Text style={styles.errorMssg}>{msg}</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  errorMssg: {
    fontFamily: 'Inter-Regular',
    color: '#EF5350',
    fontSize: 14,
    textAlign: 'right',
    lineHeight: 17,
    // right: 5,
  },
});
