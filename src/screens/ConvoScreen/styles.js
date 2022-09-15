import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  bottomContainer: {
    width: '80%',
    borderRadius: 40,
    backgroundColor: '#F4F7FA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginLeft: 16,
    alignItems: 'center',
  },
  typingView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 10,
    backgroundColor: '#00B2EE',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 20,
  },
  recieveChat: {
    padding: 13,
    backgroundColor: '#e5e7ef',
    borderBottomLeftRadius: 1,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  sendChat: {
    padding: 13,
    backgroundColor: '#00b2ee',
    borderBottomRightRadius: 1,
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
});

export default styles;
