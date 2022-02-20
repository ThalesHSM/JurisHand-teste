import React from 'react';

import {StyledButton, StyledButtonText} from './StyledButton';

interface IButton {
  children?: any;
  icon?: any;
  color?: 'blue' | 'pink';
  onPress: () => void;
}

const Button = ({children, icon, color, onPress}: IButton) => {
  return (
    <StyledButton color={color} onPress={onPress}>
      {icon && icon}
      <StyledButtonText color={color}>{children}</StyledButtonText>
    </StyledButton>
  );
};

export default Button;
