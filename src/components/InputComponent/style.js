import {StyleSheet, Dimensions} from 'react-native';
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#BEC5E8',
    // marginVertical: 40,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  placeholder: {
    fontSize: 16,
    height: 50,
    width: '95%',
    textAlign: 'left',
    padding: 15,
  },
});
export default styles;
