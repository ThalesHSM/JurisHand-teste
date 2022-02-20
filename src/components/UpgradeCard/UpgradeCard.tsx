import React, {useState} from 'react';
import {Modal, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {doc, setDoc} from '@firebase/firestore';
import {db} from '../../screens/HomeScreen/HomeScreen';

import {
  StyledBottomText,
  StyledCenteredView,
  StyledCloseButtonView,
  StyledGobackButton,
  StyledImage,
  StyledModalView,
  StyledText,
  StyledTextView,
  StyledTitle,
  StyledUpgradeButton,
} from './StyledUpgradeCard';

import SteveJobsIcon from '../../assets/SteveJobsIcon.jpg';
import {useSelector} from 'react-redux';

interface IUpgradeCard {
  modalVisible: boolean;
  setModalVisible: any;
  navigation: any;
}

function UpgradeCard({
  modalVisible,
  setModalVisible,
  navigation,
}: IUpgradeCard) {
  const [isLoading, setIsLoading] = useState(false);

  const loggedUser = useSelector((state: any) => state.logged.logged);

  async function addUpgraded() {
    try {
      const upgradedRef = doc(db, 'users', loggedUser);
      const upgraded = true;

      async function create() {
        setIsLoading(true);
        await setDoc(upgradedRef, {
          upgraded,
        });
        navigation.navigate('Home');

        setIsLoading(false);
      }

      Alert.alert(
        'Gostaria de fazer o upgrade?',
        'Não será possível desfazer!',
        [
          {
            text: 'Cancel',

            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => create(),
          },
        ],
      );
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <StyledGobackButton onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={30} color="#7a58fa" />
      </StyledGobackButton>
      <StyledCenteredView>
        <StyledModalView
          style={{
            shadowOpacity: 1,
            shadowRadius: 5,
            shadowColor: '#000',
            shadowOffset: {height: 1, width: 1},
            elevation: 30,
          }}>
          <StyledCloseButtonView>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{}}>
              <Icon name="close" size={30} color="#7a58fa" />
            </TouchableOpacity>
          </StyledCloseButtonView>
          <StyledTextView>
            <StyledTitle>
              Faça upgrade no {'\n'}JurisHand e seja feliz.
            </StyledTitle>

            <StyledImage source={SteveJobsIcon} />
            <StyledText>
              Assine por
              <StyledText style={{color: '#000', fontWeight: 'bold'}}>
                {' '}
                R$299,90 por ano
              </StyledText>
              {'\n'}(R$24,90 por mês)
            </StyledText>

            <StyledUpgradeButton onPress={addUpgraded}>
              <StyledText style={{color: '#f075b6'}}>Assine agora</StyledText>
            </StyledUpgradeButton>
            {isLoading ? <ActivityIndicator size="large" color="#000" /> : null}
          </StyledTextView>
        </StyledModalView>

        <StyledBottomText>
          Você será cobrado imediatamente.
          {'\n'}Sem período trial
        </StyledBottomText>
      </StyledCenteredView>
    </Modal>
  );
}
export default UpgradeCard;
