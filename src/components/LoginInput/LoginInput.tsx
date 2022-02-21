import React, {useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import Button from '../Button/Button';

import {
  StyledText,
  StyledTextInput,
  StyledTextInputView,
} from './StyledLoginInput';

import {useDispatch} from 'react-redux';

import {changeLoggedIn} from '../../redux/actions/upgrade-action';
import Icon from 'react-native-vector-icons/AntDesign';
import {auth} from '../../config/firebase/firebaseConfig';

interface ILogin {
  setIsLoading: any;
}

function LoginInput({setIsLoading}: ILogin) {
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  function createUser() {
    const trimEmail = email.replace('\n', '').trim();
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, trimEmail, password)
      .then(userCredential => {
        // Signed in

        const user = userCredential.user;
        dispatch(changeLoggedIn(user.uid));

        setIsLoading(false);

        // ...
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert('error:', error.message);
      });
  }
  function signInUser() {
    const trimEmail = email.replace('\n', '').trim();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, trimEmail, password)
      .then(userCredential => {
        // Signed in

        const user = userCredential.user;
        dispatch(changeLoggedIn(user.uid));

        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert('error:', error.message);
        // ..
      });
  }

  return (
    <>
      <StyledTextInputView>
        <StyledTextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize={'none'}
          placeholderTextColor={'#000'}
        />
        <StyledTextInput
          placeholder="Senha"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholderTextColor={'#000'}
        />
      </StyledTextInputView>

      {isCreateAccount ? (
        <>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Button
              onPress={createUser}
              icon={<Icon name="login" size={28} color="#f075b6" />}
              children="Criar conta"
            />

            <TouchableOpacity onPress={() => setIsCreateAccount(false)}>
              <StyledText style={{marginTop: 40}}>Já possui conta?</StyledText>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Button
              onPress={signInUser}
              children="Login"
              icon={<Icon name="login" size={28} color="#f075b6" />}
            />
            <TouchableOpacity onPress={() => setIsCreateAccount(true)}>
              <StyledText style={{marginTop: 40}}>Criar conta</StyledText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

export default LoginInput;
