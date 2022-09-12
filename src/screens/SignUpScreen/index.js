import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as yup from 'yup';

import styles from './style';
import Buttn from '../../components/Buttn Components';
import Textinput from '../../components/InputComponent';
import ErrCompnt from '../../components/ErrorMessgComponent';
import Image from '../../constants/Images';

const index = () => {
  const navigation = useNavigation();

  const [name, setStdName] = useState('');
  const [email, setstdMail] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = () => {
    console.log('Pressedddddd==');
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup
      .string()
      .min(6, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validationSchema,
    onSubmit: values => {
      console.log('FORMIK VALUE=====', values);
      onSignup(values);
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.Header}>Create an account</Text>
        <View>
          <Textinput
            Textinput={'Full name'}
            inputColor={'#7E84A3'}
            onChangeText={formik.handleChange('name')}
            value={formik.values.name}
            onBlur={formik.handleBlur('name')}
          />
          {formik.errors.name && formik.touched.name && (
            <ErrCompnt msg={formik.errors.name} />
          )}
          <Textinput
            Textinput={'Email address'}
            inputColor={'#7E84A3'}
            onChangeText={formik.handleChange('email')}
            value={formik.values.email}
            onBlur={formik.handleBlur('email')}
          />
          {formik.errors.email && formik.touched.email && (
            <ErrCompnt msg={formik.errors.email} />
          )}
          <Textinput
            Textinput={'Password'}
            Icon={Image.Invivisible}
            secureTextEntry
            inputColor={'#7E84A3'}
            onChangeText={formik.handleChange('password')}
            value={formik.values.password}
            onBlur={formik.handleBlur('password')}
          />
          {formik.errors.password && formik.touched.password && (
            <ErrCompnt msg={formik.errors.password} />
          )}
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Buttn label={'Sign up'} tapOn={formik.handleSubmit} />
          <Text style={styles.ORtext}>OR</Text>
          <Buttn
            label={'Sign up with Google'}
            btnStyle={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#000',
            }}
            txtStyle={{color: '#000'}}
            tapOn={() => {
              navigation.navigate('');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
