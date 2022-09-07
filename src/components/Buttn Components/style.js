import {StyleSheet, Dimensions} from 'react-native';
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
    backgroundColor: '#03A9F4',
    height: 45,
    width: ScreenWidth / 1.7,
    marginVertical: 5,
    marginHorizontal: 10,
    // marginLeft: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
