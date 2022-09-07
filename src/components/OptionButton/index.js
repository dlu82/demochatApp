import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Index = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.5,
        }}>
        <Image
          style={{height: 10, width: 30}}
          source={require('../../assets/images/more.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Index;
