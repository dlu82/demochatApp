import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 45,
          width: 45,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.5,
        }}>
        <Ionicons name={'arrow-back'} color={'black'} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Index;
