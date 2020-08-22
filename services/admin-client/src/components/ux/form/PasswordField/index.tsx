/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MUITextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useTheme, IconButton } from '@material-ui/core';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = TextFieldProps & {
  canShow?: boolean;
};

const PasswordField: React.FC<Props> = ({ canShow, ...props }) => {
  const { palette } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const { register, errors } = useFormContext();
  const hasError = props.name ? !!errors[props.name] : false;
  const message = props.name && hasError ? errors[props.name].message : null;
  const { helperText } = props;

  const inputProps = {
    ...props.InputProps,
    endAdornment: canShow ? (
      <IconButton
        size="small"
        onClick={() => setShowPassword(p => !p)}
        disabled={props.disabled}
      >
        {showPassword ? (
          <AiOutlineEye color={palette.primary.main} />
        ) : (
          <AiOutlineEyeInvisible color={palette.primary.main} />
        )}
      </IconButton>
    ) : null,
  };

  return (
    <MUITextField
      {...props}
      inputRef={register}
      type={showPassword ? 'text' : 'password'}
      InputProps={{ ...inputProps }}
      error={hasError}
      helperText={hasError ? message : helperText}
    />
  );
};

PasswordField.defaultProps = {
  variant: 'outlined',
  size: 'small',
  canShow: true,
};

export default PasswordField;
