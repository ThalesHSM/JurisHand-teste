import styled, {css} from 'styled-components/native';

interface IButton {
  children: any;
  icon?: any;
  color?: 'blue' | 'pink';
  onPress: () => void;
}
interface IText {
  color?: 'blue' | 'pink';
}
export const StyledButton = styled.TouchableOpacity<IButton>`
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 80px;
  border-width: 3px;
  border-radius: 10px;
  background-color: #fff;
  border-color: #f075b6;
  align-self: center;
  margin-top: 40px;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  ${props =>
    props.color === 'blue' &&
    css`
      border-color: #7a58fa;
      color: #7a58fa;
    `};
`;

export const StyledButtonText = styled.Text<IText>`
  font-size: 20px;
  color: #f075b6;

  ${props =>
    props.color === 'blue' &&
    css`
      color: #7a58fa;
    `};
`;
