import {View, Text, Image} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import styles from './styles';

const Index = () => {
  return (
    <View style={{marginTop: 20}}>
      <View style={styles.searchView}>
        <Image
          style={{height: 20, width: 20, marginLeft: 10}}
          source={require('../../assets/images/searchicon.png')}
        />
        <TextInput
          placeholder="Search contacts"
          style={{paddingHorizontal: 20}}></TextInput>
      </View>
    </View>
  );
};

export default Index;
