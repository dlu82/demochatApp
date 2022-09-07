import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import style from './style';
import image from '../../constants/Images';
import Buttn from '../../components/Buttn Components';

const index = () => {
  return (
    <View style={style.container}>
      <Image
        source={image.Message}
        style={{
          width: 200,
          height: 200,
          position: 'absolute',
          top: 50,
        }}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            color: '#000',
            fontSize: 30,
            textAlign: 'center',
            marginTop: 50,
            fontWeight: 'bold',
          }}>
          chat with your friends
        </Text>
        <Text
          style={{
            color: '#BDBDBD',
            fontSize: 15,
            textAlign: 'center',
            marginTop: 10,
          }}>
          We will help you with finding best language tutor in your area. You
          can set your preferences and more!
        </Text>
      </View>
      <View style={{position: 'absolute', bottom: 30}}>
        <Buttn label={'Get Started'} />
        <Buttn
          label={'Skip for now'}
          txtStyle={{color: '#BDBDBD', fontSize: 15}}
          btnStyle={{backgroundColor: '#fff'}}
        />
      </View>
    </View>
  );
};

export default index;
