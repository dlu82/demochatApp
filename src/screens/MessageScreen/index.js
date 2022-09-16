import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import OptionButton from '../../components/OptionButton';
import SearchView from '../../components/SearchView';
import styles from './styles';
import constants from '../../assets/constants/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Index = ({item}) => {
  const [data, setData] = useState([]);
  const [chat, setChat] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getDataFromStore();
  }, []);

  const getDataFromStore = async () => {
    const users = await firestore().collection('USER').get();
    console.log(users, '==================== users =============');
    setData(users._docs);
  };

  const renderItem = ({item}) => <CustomComponent item={item} />;

  const CustomComponent = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('convo', {name: item?._data?.name})}
      style={styles.CustomComponentView}>
      <View>
        <Image
          style={{height: 50, width: 50, borderRadius: 25, marginLeft: 20}}
          source={require('../../assets/images/lady.jpeg')}
        />
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.nameView}>{item?._data?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
      <View style={styles.subContainer}>
        <Header />
        <OptionButton />
      </View>
      <View>
        <SearchView />
      </View>

      <View style={{marginHorizontal: 16}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 40}}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Index;
