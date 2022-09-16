import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import Header from '../../components/Header';
import OptionButton from '../../components/OptionButton';
import SearchView from '../../components/SearchView';
import styles from './styles';
import constants from '../../constants/constants';

const Index = ({item}) => {
  const navigation = useNavigation();
  const renderItem = ({item}) => <CustomComponent item={item} />;
  const CustomComponent = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('convo')}
      style={styles.CustomComponentView}>
      <View>
        <Image style={styles.image} source={{uri: item.image}} />
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.nameView}>{item.name}</Text>
        <Text>{item.title}</Text>
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
          contentContainerStyle={{bottom: 40, marginTop: 20}}
          data={constants.flatlistData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Index;
