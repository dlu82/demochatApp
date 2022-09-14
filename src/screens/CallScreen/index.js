import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';

const Index = () => {
  return (
    <View style={[styles.container, {backgroundColor: '#fff', flex: 1}]}>
      <Text>first page</Text>
    </View>
  );
};

export default Index;
