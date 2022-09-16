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
import {useDispatch, useSelector} from 'react-redux';
import {userData} from '../../store/Slices/FirebaseSlice';

import style from './style';
import image from '../../constants/Images';
import Buttn from '../../components/Buttn Components';
import TextInput from '../../components/InputComponent';
import ErrCompnt from '../../components/ErrorMessgComponent';

const index = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch({});
  const {data} = useSelector(state => state.firebaseStore);

  console.log('SUCCESSSS======  ', {data});

  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [errMail, setErrmail] = useState('');
  const [password, setPassword] = useState('');
  const [errPass, setErrpass] = useState('');

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
    }
    if (password != '') {
      if (password.length >= 5) {
        setErrpass(false);
      } else {
        setErrpass(true);
      }
    }
  }, [mail, password]);

  const onSignin = () => {
    console.log('signinnn===');
    if (!errPass && !errMail) {
      auth()
        .signInWithEmailAndPassword(mail, password)
        .then(response => {
          console.log('Login Success!======', response?.user?._user);

          dispatch(userData(response?.user?._user?.email));

          Keyboard.dismiss();
          setMail('');
          setPassword('');
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
    auth()
      .createUserWithEmailAndPassword(mail, password)
      .then(res => {
        console.log('User account created & signed in!', res);
        dispatch(userData(res?.user?._user?.email));

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

        console.error(error);
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
              Textinput={'Username'}
              inputColor={'#7E84A3'}
              onChangeText={text => setUsername(text)}
              value={username}
            />
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
        <View style={{marginTop: 20}}>
          <Buttn label={'Login'} tapOn={onSignin} />
          <Buttn
            label={'Signup'}
            txtStyle={{color: '#BDBDBD', fontSize: 15}}
            btnStyle={{backgroundColor: '#fff'}}
            tapOn={onSignup}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default index;
