import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {userData} from '../../store/Slices/FirebaseSlice';
import {useDispatch, useSelector} from 'react-redux';

import style from './style';
import image from '../../constants/image';
import Buttn from '../../components/Buttn Components';
import TextInput from '../../components/InputComponent';
import ErrCompnt from '../../components/ErrorMessgComponent';

const index = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch({});
  const toast = useToast();

  const {data} = useSelector(state => state.firebaseStore);
  // console.log('fromINIT screen==', data);

  const [username, setUsername] = useState('');
  const [errName, setErrname] = useState('');
  const [mail, setMail] = useState('');
  const [errMail, setErrmail] = useState('');
  const [password, setPassword] = useState('');
  const [errPass, setErrpass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isLoad1, setIsLoad1] = useState(false);

  useEffect(() => {
    if (mail != '') {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      const mailValid = reg.test(mail);
      // console.log('mail-------------------', mailValid);
      setErrmail({errMail: !mailValid});
      if (mailValid) {
        setErrmail(false);
      } else {
        setErrmail(true);
      }
      const users = firestore().collection('Messages').get();
    }
    if (password != '') {
      if (password.length >= 5) {
        setErrpass(false);
      } else {
        setErrpass(true);
      }
    }
    if (username != '') {
      if (username.length >= 5) {
        setErrname(false);
      } else {
        setErrname(true);
      }
    }
    // toast.show('Hello World');
  }, [mail, password, username]);

  const onSignin = async () => {
    // console.log('signinnn===');
    if (username == '' && mail == '' && password == '') {
      setErrname(true);

      setErrmail(true);
      setErrpass(true);
      return;

      //   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      //   const mailValid = reg.test(mail);
      //   console.log('mail-------------------', mailValid);
      //   setErrmail({errMail: !mailValid});
      //   if (mailValid) {
      //     setErrmail(false);
      //   } else {
      //     setErrmail(true);
      //   }
      // }
      // if (password != '') {
      //   if (password.length >= 5) {
      //     setErrpass(false);
      //   } else {
      //     setErrpass(true);
      //   }
      // }
      // if (username != '') {
      //   if (username.length >= 5) {
      //     setErrname(false);
      //   } else {
      //     setErrname(true);
      //   }
    }

    if (!errPass && !errMail) {
      setIsLoad(true);

      auth()
        .signInWithEmailAndPassword(mail, password)
        .then(async response => {
          // console.log('Login Success!======', response?.user?._user);
          const user = await firestore().collection('USER').doc(mail).get();
          console.log(user);
          const payload = {
            name: user?._data?.name,
            mail: user?._data?.email,
            token: response?.user?._user?.uid,
          };
          // console.log('LOGIN USERRRR======= ', payload);
          await dispatch(userData(payload));
          setIsLoad(false);

          Keyboard.dismiss();
          setMail('');
          setPassword('');
          navigation.navigate('bottomNav');
        })
        .catch(error => {
          // console.log('sign in error=======', error.code);
          if (error.code === 'auth/user-not-found') {
            toast.show('auth/user-not-found', {
              type: 'danger',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'zoom-in',
            });
            // console.log('That email address is already in use!');
            // alert('User not Found Please Register');
          }

          if (error.code === 'auth/invalid-email') {
            toast.show('This mail is not valid!', {
              type: 'danger',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'zoom-in',
            });
            // alert('Mail is not correct!!!!');

            // console.log('That email address is invalid!');
          }
          if (error.code === 'auth/wrong-password') {
            // console.log('That email address is already in use!');
            toast.show('Password is not correct!', {
              type: 'danger',
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'zoom-in',
            });
            // console.log('Wrongggggg=====');

            // alert('Password is not correct!!!!');
          }
          setIsLoad(false);
          console.error(error);
        });
    }
  };

  const onSignup = async () => {
    // console.log('Pressedddddd==');

    if (username == '' && mail == '' && password == '') {
      setErrname(true);
      setErrmail(true);
      return;

      //   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      //   const mailValid = reg.test(mail);
      //   console.log('mail-------------------', mailValid);
      //   setErrmail({errMail: !mailValid});
      //   if (mailValid) {
      //     setErrmail(false);
      //   } else {
      //     setErrmail(true);
      //   }
      // }
      // if (password != '') {
      //   if (password.length >= 5) {
      //     setErrpass(false);
      //   } else {
      //     setErrpass(true);
      //   }
      // }
      // if (username != '') {
      //   if (username.length >= 5) {
      //     setErrname(false);
      //   } else {
      //     setErrname(true);
      //   }
    }
    if (!errName) {
      setIsLoad1(true);

      auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(res => {
          console.log('User account created & signed in!', res);
          const payload = {
            name: username,
            mail: mail,
            token: res?.user?._user?.uid,
          };
          firestore()
            .collection('USER')
            .doc(mail)
            .set({
              name: username,
              email: mail,
            })
            .then(res => {
              // console.log('User added!===== ', res);
              Keyboard.dismiss();
              setMail('');
              setPassword('');
              dispatch(userData(payload));
              navigation.navigate('bottomNav');
            })
            .catch(err => console.log('add firestore error=====', err));
          setIsLoad1(false);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            toast.show('That email address is already in use!', {
              type: 'warning',
              placement: 'top',
              duration: 4000,
              offset: 30,
              animationType: 'zoom-in',
            });
            // alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            toast.show('Enter a valid mail!', {
              type: 'warning',
              placement: 'top',
              duration: 4000,
              offset: 30,
              animationType: 'zoom-in',
            });
            console.log('That email address is invalid!');
          }
          setIsLoad1(false);
        });
    }
  };

  return (
    <View style={style.container}>
      <KeyboardAwareScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Image
          source={image.Message}
          style={{
            width: 200,
            height: 200,
            marginTop: 20,
            alignItems: 'center',
          }}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: '#000',
              fontSize: 30,
              textAlign: 'center',
              marginTop: 30,
              fontWeight: 'bold',
            }}>
            chat with your friends
          </Text>
          <View>
            <TextInput
              Textinput={'Email'}
              inputColor={'#7E84A3'}
              onChangeText={text => setMail(text)}
              value={mail}
            />
            {errMail && <ErrCompnt msg={'Email is not valid'} />}
            <TextInput
              Textinput={'Password'}
              inputColor={'#7E84A3'}
              secureTextEntry
              isIcon
              Icon={image.Invivisible}
              onChangeText={text => setPassword(text)}
              value={password}
            />
            {errPass && <ErrCompnt msg={'Password is too short'} />}

            <View style={{position: 'absolute', right: 28, bottom: -15}}>
              <TouchableOpacity>
                <Text style={style.ForgotPassword}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Buttn
            label={'Login'}
            tapOn={onSignin}
            isLoading={isLoad}
            indicatorColor={'#fff'}
          />
          <Buttn
            label={'Signup'}
            txtStyle={{color: '#BDBDBD', fontSize: 15}}
            btnStyle={{backgroundColor: '#fff', width: 180}}
            tapOn={() => setModalVisible(true)}
          />
        </View>
      </KeyboardAwareScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        backdropOpacity={0.3}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={style.modalCont}>
          <TextInput
            Textinput={'Username'}
            inputColor={'#7E84A3'}
            onChangeText={text => setUsername(text)}
            value={username}
          />
          {errName && <ErrCompnt msg={'User name is too short'} />}
          <Buttn
            label={'Submit'}
            txtStyle={{color: '#BDBDBD', fontSize: 15}}
            btnStyle={{backgroundColor: '#fff', width: 100}}
            tapOn={onSignup}
            isLoading={isLoad1}
            indicatorColor={'#000'}
          />
        </View>
      </Modal>
    </View>
  );
};

export default index;
