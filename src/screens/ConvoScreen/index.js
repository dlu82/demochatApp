import {View, Text, TextInput, FlatList, Image} from 'react-native';
import {useEffect, useState} from 'react';
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
  const [chat, setChat] = useState();
  const [availableDocId, setAvailableDocId] = useState('');

  const navigation = useNavigation();
  const Route = useRoute();
  const email = Route.params.email;
  console.log(data, availableDocId, '++++++++++++++++++++++++');

  const renderItem = ({item}) => <CustomComponent item={item} />;

  const onResult = QuerySnapshot => {
    console.log('Got Users collection result========.', QuerySnapshot);
    if (QuerySnapshot?._docs.length > 0) {
      setConvo(QuerySnapshot?._docs);
    } else {
      setConvo([]);
    }
  };

  const onError = error => {
    console.error('error fetch=========', error);
  };

  useEffect(async () => {
    const docId_1 = data.mail + '_' + email;
    const docId_2 = email + '_' + data.mail;

    const isDoc1Available = await firestore()
      .collection('Messages')
      .doc(docId_1)
      .collection('CHAT')
      .get();
    const isDoc2Available = await firestore()
      .collection('Messages')
      .doc(docId_2)
      .collection('CHAT')
      .get();

    if (
      isDoc1Available?._docs.length == 0 &&
      isDoc2Available?._docs.length == 0
    ) {
      console.log('doc not exist======');
      firestore()
        .collection('Messages')
        .doc(docId_1)
        .collection('CHAT')
        .add({
          from: data.mail,
          to: email,
          message: '',
        })
        .then(() => {
          console.log('User added!========');
        });
    }
    if (isDoc1Available?._docs.length > 0) {
      setAvailableDocId(docId_1);
    } else if (isDoc2Available?._docs.length > 0) {
      setAvailableDocId(docId_2);
    }

    console.log('Messages useEffect', isDoc1Available, isDoc2Available);
  }, [email]);

  useEffect(() => {
    if (availableDocId) {
      firestore()
        .collection('Messages')
        .doc(availableDocId)
        .collection('CHAT')
        .orderBy('timeanddate', 'asc')
        .onSnapshot(onResult, onError);
    }
  }, [availableDocId]);

  // useEffect(() => {
  //   const users = firestore().collection('Messages').get();
  // }, []);

  const date = new Date();

  const onsubmit = () => {
    console.log(chat, email, data.mail, date);
    firestore()
      .collection('Messages')
      .doc(availableDocId)
      .collection('CHAT')
      .add({
        message: chat,
        from: data.mail,
        to: email,
        timeanddate: date,
      })
      .then(() => {
        console.log('chat added!========');
        setChat('');
      });
  };

  const CustomComponent = ({item}) => (
    <TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <View style={{padding: 20, width: '100%'}}>
          {item._data.from === data.mail ? (
            <View style={styles.sendChat}>
              <Text style={{textAlign: 'right', color: '#fff'}}>
                {item._data.message}
              </Text>
            </View>
          ) : (
            <View style={styles.recieveChat}>
              <Text style={{textAlign: 'left'}}>{item._data.message}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
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
                value={chat}
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
          }}
          style={styles.typingView}>
          <Feather name={'send'} color={'white'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Convo;
