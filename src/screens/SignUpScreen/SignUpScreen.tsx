import React, {useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  StyledGobackButton,
  StyledMainView,
  StyledText,
  StyledUpgradeNowButton,
} from './StyledSignUpScreen';

import UpgradeCard from '../../components/UpgradeCard/UpgradeCard';

function SignUpScreen({navigation}: any) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <StyledMainView>
      <StyledGobackButton onPress={() => navigation.navigate('Home')}>
        <Icon name="arrowleft" size={30} color="#7a58fa" />
      </StyledGobackButton>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <StyledUpgradeNowButton onPress={() => setModalVisible(true)}>
          <StyledText>Faça upgrade agora!</StyledText>
        </StyledUpgradeNowButton>
      </View>
      <UpgradeCard
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        navigation={navigation}
      />
    </StyledMainView>
  );
}
export default SignUpScreen;
