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

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import style from './style';
import image from '../../constants/image';
import Buttn from '../../components/Buttn Components';
import TextInput from '../../components/InputComponent';
import ErrCompnt from '../../components/ErrorMessgComponent';
import Modal from 'react-native-modal';
import {userData} from '../../store/Slices/FirebaseSlice';
import {useDispatch} from 'react-redux';

const index = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch({});

  const [username, setUsername] = useState('justin@gmail.com');
  const [errName, setErrname] = useState('');
  const [mail, setMail] = useState('justin@gmail.com');
  const [errMail, setErrmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [errPass, setErrpass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
  }, [mail, password, username]);

  const onSignin = async () => {
    console.log('signinnn===');

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

    if (!errPass && !errMail) {
      auth()
        .signInWithEmailAndPassword(mail, password)
        .then(async response => {
          console.log('Login Success!======', response?.user?._user);
          const user = await firestore().collection('USER').doc(mail).get();
          const payload = {
            name: user?._data?.name,
            mail: user?._data?.email,
          };
          console.log('LOGIN USERRRR======= ', user);
          await dispatch(userData(payload));

          Keyboard.dismiss();
          setMail('');
          setPassword('');
          navigation.navigate('bottomNav');
        })
        .catch(error => {
          console.log('sign in error=======', error.code);
          if (error.code === 'auth/user-not-found') {
            // console.log('That email address is already in use!');
            alert('User not Found Please Register Or Check Password');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  const onSignup = async () => {
    console.log('Pressedddddd==');

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

    auth()
      .createUserWithEmailAndPassword(mail, password)
      .then(() => {
        console.log('User account created & signed in!');
        const payload = {
          name: username,
          mail: mail,
        };
        firestore()
          .collection('USER')
          .doc(mail)
          .set({
            name: username,
            email: mail,
          })
          .then(res => {
            console.log('User added!===== ', res);
            Keyboard.dismiss();
            setMail('');
            setPassword('');
            dispatch(userData(payload));
            navigation.navigate('bottomNav');
          })
          .catch(err => console.log('add firestore error=====', err));
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      });
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
          <Buttn label={'Login'} tapOn={onSignin} />
          <Buttn
            label={'Signup'}
            txtStyle={{color: '#BDBDBD', fontSize: 15}}
            btnStyle={{backgroundColor: '#fff', width: 100}}
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
          />
        </View>
      </Modal>
    </View>
  );
};

export default index;
