/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useFormContext } from 'react-hook-form';
import MUITextField, { TextFieldProps } from '@material-ui/core/TextField';

type Props = TextFieldProps & {};

const TextField: React.FC<Props> = props => {
  const { register, errors } = useFormContext();
  const hasError = props.name ? !!errors[props.name] : false;
  const message = props.name && hasError ? errors[props.name].message : null;
  const { helperText } = props;

  return (
    <MUITextField
      {...props}
      inputRef={register}
      error={hasError}
      helperText={hasError ? message : helperText}
    />
  );
};

TextField.defaultProps = {
  variant: 'outlined',
  size: 'small',
};

export default TextField;
