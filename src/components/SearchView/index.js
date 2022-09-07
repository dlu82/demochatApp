import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import Search from '../../assets/images/search.svg';
import {TextInput} from 'react-native-gesture-handler';

const Index = () => {
  return (
    <View style={{marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#f5f5f5',
          paddingLeft: 10,
          marginHorizontal: 20,
          borderRadius: 40,
          alignItems: 'center',
        }}>
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
