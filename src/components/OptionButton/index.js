import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const Index = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: 45,
          width: 45,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.5,
        }}>
        <Feather name={'more-horizontal'} color={'black'} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Index;
