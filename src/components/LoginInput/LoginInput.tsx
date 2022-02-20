import React, {useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import firebaseConfig from '../../config/firebase/firebaseConfig';
import {getFirestore, initializeFirestore} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';

import {
  StyledButtonText,
  StyledSignInButton,
  StyledText,
  StyledTextInput,
  StyledTextInputView,
} from './StyledLoginInput';

import {useDispatch} from 'react-redux';

import {changeLoggedIn} from '../../Redux/actions/upgrade-action';

const app = initializeApp(firebaseConfig);

initializeFirestore(app, {experimentalForceLongPolling: true});

export const db = getFirestore(app);

interface ILogin {
  setIsLoading: any;
}

function LoginInput({setIsLoading}: ILogin) {
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  function createUser() {
    const auth = getAuth();

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
    const auth = getAuth();

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
            <StyledSignInButton onPress={createUser}>
              <StyledButtonText>Criar conta</StyledButtonText>
            </StyledSignInButton>
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
            <StyledSignInButton onPress={signInUser}>
              <StyledButtonText>Login</StyledButtonText>
            </StyledSignInButton>
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
