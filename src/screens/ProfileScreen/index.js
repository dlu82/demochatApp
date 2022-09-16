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

const index = ({}) => {
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
        <Pressable
          style={style.profilePic}
          onPress={() => setModalVisible(true)}>
          <ImageBackground
            source={image.User}
            style={{width: 100, height: 100}}
            imageStyle={{borderRadius: 50, resizeMode: 'contain'}}>
            <Image source={image.Camera} style={style.camera} />
          </ImageBackground>
        </Pressable>
        <Text style={style.input} onChangeText={text => setUsername(text)}>
          Name:
        </Text>
        <Text style={style.input} onChangeText={text => setMail(text)}>
          E mail:
        </Text>
      </View>
    </View>
  );
};

export default index;
