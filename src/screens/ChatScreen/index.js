import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import OptionButton from '../../components/OptionButton';
import SearchView from '../../components/SearchView';
import Search from '../../assets/images/search.svg';

const Index = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          marginHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Header />

        <OptionButton />
      </View>
      <View>
        <SearchView />
      </View>
    </View>
  );
};

export default Index;
