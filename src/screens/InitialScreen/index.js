import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useFormik} from 'formik';
import * as yup from 'yup';

import style from './style';
import image from '../../constants/Images';
import Buttn from '../../components/Buttn Components';
import TextInput from '../../components/InputComponent';
import ErrCompnt from '../../components/ErrorMessgComponent';

const index = () => {
  const navigation = useNavigation();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const onSignin = () => {
    auth()
      .signInWithEmailAndPassword(mail, password)
      .then(response => {
        console.log('Login Success!', response);
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
  };

  const onSignup = () => {
    console.log('Pressedddddd==');
    auth()
      .createUserWithEmailAndPassword(mail, password)
      .then(() => {
        console.log('User account created & signed in!');
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
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup
      .string()
      .min(6, 'Too Short!')
      // .max(10, 'Too Long!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    // validationSchema,
    onSubmit: values => {
      console.log('FORMIK VALUE=====', values);
      onSignup(values);
      onSignin(values);
    },
  });

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
              marginTop: 50,
              fontWeight: 'bold',
            }}>
            chat with your friends
          </Text>
          <View>
            <TextInput
              Textinput={'Email/Phone number'}
              inputColor={'#7E84A3'}
              onChangeText={text => setMail(text)}
              value={mail}
            />
            {/* {formik.errors.email && formik.touched.email && (
              <ErrCompnt msg={formik.errors.email} />
            )} */}
            <TextInput
              Textinput={'Password'}
              inputColor={'#7E84A3'}
              secureTextEntry
              Icon={image.Invivisible}
              onChangeText={text => setPassword(text)}
              value={password}
            />
            {/* {formik.errors.password && formik.touched.password && (
              <ErrCompnt msg={formik.errors.password} />
            )} */}

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
