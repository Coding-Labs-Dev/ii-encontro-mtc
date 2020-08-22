/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import MUIButton, { ButtonProps } from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core';
import { AiOutlineLoading } from 'react-icons/ai';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const Loader = styled(AiOutlineLoading)`
  color: ${props => props.color};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  transform-origin: center;
  animation: ${rotate} 0.5s linear infinite;
`;

type Props = ButtonProps & {
  isFetching?: boolean;
};

const Button: React.FC<Props> = ({ children, isFetching,...props }) => {
  const { palette } = useTheme();

  if (isFetching)
    return (
      <MUIButton {...props} disabled>
        {children}
        <Loader color={palette.primary.main} />
      </MUIButton>
    );

  return <MUIButton {...props}>{children}</MUIButton>;
};

Button.defaultProps = {
  isFetching: false,
};

export default Button;
