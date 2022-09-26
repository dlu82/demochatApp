import React, {useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

const index = ({navigation}) => {
  //   const {token} = useSelector(state => state.firebaseStore);
  const {data} = useSelector(state => state.firebaseStore);
  // console.log('DATA==', data);

  useEffect(() => {
    if (data?.token) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'bottomNav'}],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'initial'}],
        }),
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={'#000'} size={'large'} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
