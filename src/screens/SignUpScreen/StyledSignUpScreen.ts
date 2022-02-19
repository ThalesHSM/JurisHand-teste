import styled from 'styled-components/native';

export const StyledMainView = styled.View`
  flex: 1;
`;
export const StyledGobackButton = styled.TouchableOpacity`
  align-items: flex-start;
  flex-direction: row;
  margin: 20px 0 0 20px;
  width: 100%;
`;

export const StyledCenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledModalView = styled.View`
  background-color: #e2e6ea;
  align-items: center;
  width: 90%;
  height: 70%;
`;

export const StyledCloseButtonView = styled.View`
  width: 95%;
  align-items: flex-end;
  position: absolute;
  z-index: 1;
`;
export const StyledUpgradeNowButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 80px;
  border-width: 3px;
  border-radius: 20px;
  background-color: #f6f6f9;
  border-color: #7a58fa;
`;

export const StyledImage = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 100px;
  border-width: 8px;
  border-color: #fff;
`;

export const StyledTextView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const StyledTitle = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
`;

export const StyledText = styled.Text`
  color: #606975;
  font-size: 20px;
  text-align: center;
`;

export const StyledBottomText = styled.Text`
  margin-top: 20px;
  color: #000;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
`;

export const StyledUpgradeButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 80px;
  border-width: 3px;
  background-color: #f6f6f9;
  border-color: #f075b6;
`;
