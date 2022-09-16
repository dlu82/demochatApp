import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import OptionButton from '../../components/OptionButton';
import SearchView from '../../components/SearchView';
import styles from './styles';
import constants from '../../constants/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const Index = ({item}) => {
  const [List, setList] = useState([]);
  const [chat, setChat] = useState([]);
  const navigation = useNavigation();
  const {data} = useSelector(state => state.firebaseStore);

  useEffect(() => {
    getDataFromStore();
  }, []);

  const getDataFromStore = async () => {
    const users = await firestore().collection('USER').get();

    const filterData = users._docs.filter((item, index) => {
      console.log(item._data.email, data.mail);
      if (item._data.email != data.mail) return item;
    });
    setList(filterData);
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
          data={List}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Index;
