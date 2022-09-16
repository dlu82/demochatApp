import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import image from '../../constants/image';
import style from './styles';
import {useSelector} from 'react-redux';
import {userData} from '../../store/Slices/FirebaseSlice';

const index = ({}) => {
  const {data} = useSelector(state => state.firebaseStore);
  console.log('PROFILE===========  ', data);

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');

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
    </View>
  );
};

export default index;
