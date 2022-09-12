import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './style';

const TextInputComponents = ({
  txt,
  Textinput,
  containerStyle,
  inputColor,
  Icon,
  onChangeText,
  value,
  secureTextEntry,
  container,
  ...props
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(secureTextEntry);

  const handleToggleClick = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <View style={{...styles.container, ...container}}>
      <TextInput
        secureTextEntry={passwordVisibility}
        style={{...styles.placeholder, ...containerStyle}}
        placeholder={Textinput}
        placeholderTextColor={inputColor}
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
      <TouchableOpacity onPress={handleToggleClick}>
        <Image
          source={Icon}
          style={{width: 20, height: 20, tintColor: '#7E84A3', marginRight: 15}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default TextInputComponents;
