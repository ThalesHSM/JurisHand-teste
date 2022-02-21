import React, {useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {StyledGobackButton, StyledMainView} from './StyledSignUpScreen';

import UpgradeModal from '../../components/UpgradeModal/UpgradeModal';
import Button from '../../components/Button/Button';

function SignUpScreen({navigation}: any) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <StyledMainView>
      <StyledGobackButton onPress={() => navigation.navigate('Home')}>
        <Icon name="arrowleft" size={30} color="#7a58fa" />
      </StyledGobackButton>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={() => setModalVisible(true)}
          children="Faça upgrade agora!"
          color="blue"
        />
      </View>
      <UpgradeModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        navigation={navigation}
      />
    </StyledMainView>
  );
}
export default SignUpScreen;
