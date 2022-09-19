import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList, Image, Pressable} from 'react-native';

import styles from './styles';
import OptionButton from '../../components/OptionButton';
import Backbutton from '../../components/Backbutton';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import constants from '../../constants/constants/';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {useSelector} from 'react-redux';

const Convo = () => {
  const {data} = useSelector(state => state.firebaseStore);

  const [convo, setConvo] = useState([]);
  const [chat, setChat] = useState([]);
  console.log(chat, '++++++++++++++++++++++++');

  const navigation = useNavigation();
  const Route = useRoute();
  const email = Route.params.email;
  console.log(data, '++++++++++++++++++++++++');

  const renderItem = ({item}) => <CustomComponent item={item} />;

  useEffect(() => {
    getDataFromStore();
  }, []);

  const getDataFromStore = async () => {
    const users = await firestore().collection('Messages').get();
    // console.log(users, '==================== users =============');
  };

  useEffect(() => {
    const users = firestore().collection('Messages').get();
  }, []);

  const date = new Date();

  const onsubmit = () => {
    console.log(chat, email, data.mail, date);
    firestore()
      .collection('Messages')
      .add({
        message: chat,
        from: email,
        to: data.mail,
        timeanddate: date,
      })
      .then(() => {
        console.log('chat added!');
      });
  };

  const CustomComponent = ({item}) => (
    <Pressable onPress={() => navigation.navigate('convo')}>
      <View style={{flexDirection: 'row'}}>
        <View style={{padding: 20, width: '100%'}}>
          {item.position == 0 ? (
            <View style={styles.recieveChat}>
              <Text style={{textAlign: 'left'}}>{item.message}</Text>
            </View>
          ) : (
            <View style={styles.sendChat}>
              <Text style={{textAlign: 'right', color: '#fff'}}>
                {item._data.message}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Backbutton />
        <View>
          <Text style={{fontSize: 20, color: 'black'}}>
            {Route.params.name}
          </Text>
        </View>
        <OptionButton />
      </View>

      <View style={{marginHorizontal: 16}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 130}}
          data={convo}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // initialScrollIndex={5}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 20,
          alignItems: 'center',
        }}>
        <View style={styles.bottomContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Feather name={'smile'} color={'#CFD4DD'} size={25} />
            </TouchableOpacity>
            <View style={{marginLeft: 10}}>
              <TextInput
                onChangeText={s => setChat(s)}
                placeholder="Type something ..."
              />
            </View>
          </View>
          <TouchableOpacity>
            <Feather name={'paperclip'} color={'#CFD4DD'} size={23} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            onsubmit();

            setChat();
          }}
          style={styles.typingView}>
          <Feather name={'send'} color={'white'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Convo;
