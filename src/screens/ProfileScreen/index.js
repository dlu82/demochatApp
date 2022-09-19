import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import {clearData, userData} from '../../store/Slices/FirebaseSlice';
import image from '../../constants/image';
import style from './styles';
import Buttn from '../../components/Buttn Components';

const index = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const didTapOnLogout = () => {
    Alert.alert('Delete', 'Are you sure you want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => logoutFunction()},
    ]);
  };

  const logoutFunction = async () => {
    await dispatch(userData(null));
    console.log('User signed out!');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'initial'}],
      }),
    );
  };
  const {data} = useSelector(state => state.firebaseStore);
  console.log('PROFILE===========  ', data);

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={'#E0E0E0'} barStyle="dark-content" />
      <View>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 20,
            fontSize: 30,
            color: '#000',
          }}>
          User Update
        </Text>
        <View style={style.profilePic}>
          <ImageBackground
            source={image.User}
            style={{width: 100, height: 100}}
            imageStyle={{borderRadius: 50, resizeMode: 'contain'}}>
            <Image source={image.Camera} style={style.camera} />
          </ImageBackground>
        </View>
        <Text style={style.input}>Name: {data?.name}</Text>
        <Text style={style.input}>E mail: {data?.mail}</Text>
      </View>
      <Buttn
        label={'Logout'}
        btnStyle={{width: 100, borderRadius: 10, backgroundColor: '#000'}}
        tapOn={didTapOnLogout}
      />
    </View>
  );
};

export default index;
