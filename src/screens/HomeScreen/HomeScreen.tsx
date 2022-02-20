import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Alert, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import firebaseConfig from '../../config/firebase/firebaseConfig';
import {
  doc,
  getDoc,
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';

import {
  StyledButtonText,
  StyledGreyText,
  StyledH1Text,
  StyledMainView,
  StyledSignInButton,
  StyledText,
  StyledTextInput,
  StyledTextInputView,
} from './StyledHomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {changeLoggedIn} from '../../Redux/actions/upgrade-action';

const app = initializeApp(firebaseConfig);

initializeFirestore(app, {experimentalForceLongPolling: true});

export const db = getFirestore(app);

function HomeScreen({navigation}: any) {
  const [isLoading, setIsLoading] = useState(false);

  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isUpgradedUser, setIsUpgradedUser] = useState(false);

  const loggedUser = useSelector((state: any) => state.logged.logged);
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

  function Logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(changeLoggedIn(''));

        setIsUpgradedUser(false);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useFocusEffect(
    useCallback(() => {
      async function getUpgradedUser() {
        if (loggedUser) {
          const upgradedRef = doc(db, 'users', loggedUser);
          setIsLoading(true);
          const getFirebaseItems = await getDoc(upgradedRef);
          setIsLoading(false);

          if (getFirebaseItems.exists()) {
            setIsUpgradedUser(true);

            return;
          } else {
            return;
          }
        }
      }

      getUpgradedUser();
    }, [loggedUser]),
  );

  return (
    <StyledMainView>
      {loggedUser ? (
        <>
          <StyledH1Text>Configurações</StyledH1Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <>
              {isUpgradedUser ? (
                <View>
                  <StyledGreyText>Você já é assinante</StyledGreyText>

                  <StyledSignInButton
                    style={{flexDirection: 'row'}}
                    onPress={Logout}>
                    <Icon name="logout" size={28} color="#f075b6" />
                    <StyledButtonText style={{marginLeft: 20}}>
                      Logout
                    </StyledButtonText>
                  </StyledSignInButton>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  style={{flexDirection: 'row', marginTop: 30}}>
                  <Icon name="sync" size={28} color="grey" />
                  <StyledGreyText>Faça upgrade agora</StyledGreyText>
                </TouchableOpacity>
              )}
            </>
          )}
        </>
      ) : (
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
                  <StyledText style={{marginTop: 40}}>
                    Já possui conta?
                  </StyledText>
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
          {isLoading ? <ActivityIndicator size="large" color="#000" /> : null}
        </>
      )}
    </StyledMainView>
  );
}

export default HomeScreen;
