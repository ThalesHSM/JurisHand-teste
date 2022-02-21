import React, {useCallback, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {signOut} from 'firebase/auth';

import {doc, getDoc} from 'firebase/firestore';

import {
  StyledButtonText,
  StyledGreyText,
  StyledH1Text,
  StyledMainView,
  StyledSignInButton,
} from './StyledHomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {changeLoggedIn} from '../../redux/actions/upgrade-action';
import LoginInput from '../../components/LoginInput/LoginInput';
import db, {auth} from '../../config/firebase/firebaseConfig';

function HomeScreen({navigation}: any) {
  const [isLoading, setIsLoading] = useState(false);

  const [isUpgradedUser, setIsUpgradedUser] = useState(false);

  const loggedUser = useSelector((state: any) => state.logged.logged);
  const dispatch = useDispatch();

  function Logout() {
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
                  style={{
                    flexDirection: 'row',
                    marginTop: 30,
                    marginLeft: 30,
                  }}>
                  <Icon name="sync" size={28} color="grey" />
                  <StyledGreyText style={{marginLeft: 10}}>
                    Faça upgrade agora
                  </StyledGreyText>
                </TouchableOpacity>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <LoginInput setIsLoading={setIsLoading} />
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{marginTop: 20}}
            />
          ) : null}
        </>
      )}
    </StyledMainView>
  );
}

export default HomeScreen;
