import React from 'react';
import {View, Text, TextInput, FlatList, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import OptionButton from '../../components/OptionButton';
import Backbutton from '../../components/Backbutton';
import constants from '../../constants/constants';

const Convo = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => <CustomComponent item={item} />;
  const CustomComponent = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('convo')}
      // style={styles.CustomComponentView}
    >
      <View style={{padding: 20, width: '100%'}}>
        {item.position == 0 ? (
          <View
            style={{
              padding: 15,
              backgroundColor: '#CFD4DD',
              borderBottomLeftRadius: 1,
              borderRadius: 50,
              alignSelf: 'flex-start',
            }}>
            <Text style={{textAlign: 'left'}}>{item.message}</Text>
          </View>
        ) : (
          <View
            style={{
              padding: 15,
              backgroundColor: '#00B2EE',
              borderBottomRightRadius: 1,
              borderRadius: 50,
              alignSelf: 'flex-end',
            }}>
            <Text style={{textAlign: 'right', color: '#fff'}}>
              {item.message}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Backbutton />
        <OptionButton />
      </View>

      <View style={{marginHorizontal: 16}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 130}}
          data={constants.messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          initialScrollIndex={5}
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
              <TextInput placeholder="Type something ..." />
            </View>
          </View>
          <TouchableOpacity>
            <Feather name={'paperclip'} color={'#CFD4DD'} size={23} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.typingView}>
          <Feather name={'send'} color={'white'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Convo;
