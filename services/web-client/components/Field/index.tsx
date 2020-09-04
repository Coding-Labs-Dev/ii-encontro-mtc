import React from 'react';
import InputMask from 'react-input-mask';
import { Controller, useFormContext } from 'react-hook-form';
import { pick } from 'dot-object';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface GenericField {
  name: string;
}

interface HiddenField extends GenericField {
  type: 'hidden';
  defaultValue?: string;
}

interface SelectField extends GenericField {
  type: 'select';
  label: string;
  placeholder: string;
  options: Array<{ label: string; value: string }>;
  autoComplete?: boolean;
}

interface RadioField extends GenericField {
  type: 'radio';
  label: string;
  options: Array<{ label: string; value: string }>;
  defaultValue?: string;
}

interface CheckboxField extends GenericField {
  type: 'checkbox';
  label: string;
  defaultChecked?: boolean;
}

interface NormalField extends GenericField {
  type: 'text' | 'tel' | 'email';
  label: string;
  placeholder: string;
  mask?: object;
}

export type Field =
  | NormalField
  | HiddenField
  | SelectField
  | RadioField
  | CheckboxField;

export interface Props {
  name: string;
  type: 'hidden' | 'select' | 'radio' | 'checkbox' | 'text' | 'tel' | 'email';
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  options?: Array<
    | {
        name: string;
        label: string;
        value: string;
      }
    | {
        label: string;
        value: string;
      }
  >;
  mask?: object;
  defaultChecked?: boolean;
  autoComplete?: boolean;
}

const FieldComponent: React.FC<Props> = ({
  name,
  type,
  defaultValue = '',
  label,
  placeholder,
  options,
  mask,
  defaultChecked,
  autoComplete = false,
}) => {
  const { errors } = useFormContext();
  const error = pick(name, errors);
  if (type === 'hidden') {
    return (
      <Controller
        defaultValue={defaultValue}
        name={name}
        as={<input name={name} type="hidden" />}
      />
    );
  }
  if (['text', 'tel', 'email'].includes(type)) {
    return (
      <Controller
        defaultValue={defaultValue}
        name={name}
        as={
          mask ? (
            <TextField
              name={name}
              variant="outlined"
              placeholder={placeholder}
              label={label}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputComponent: InputMask as any,
                inputProps: mask,
              }}
              fullWidth
              type={type}
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ''}
            />
          ) : (
            <TextField
              name={name}
              variant="outlined"
              placeholder={placeholder}
              label={label}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              type={type}
              margin="normal"
              error={!!error}
              helperText={error ? error.message : ''}
            />
          )
        }
      />
    );
  }
  if (type === 'radio' && options) {
    return (
      <Controller
        defaultValue={defaultValue}
        name={name}
        render={(props) => (
          <RadioGroup name={name} value={props.value}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={option.label}
                onChange={(e) => props.onChange(option.value)}
                control={<Radio color="primary" />}
              />
            ))}
          </RadioGroup>
        )}
      />
    );
  }

  if (type === 'checkbox') {
    return (
      <Controller
        defaultValue={defaultChecked}
        name={name}
        render={(props) => (
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={props.value}
                onChange={(e) => props.onChange(e.target.checked)}
              />
            }
            label={label}
          />
        )}
      />
    );
  }

  if (type === 'select' && options) {
    if (autoComplete) {
      return (
        <Controller
          defaultValue={null}
          name={name}
          render={(props) => (
            <Autocomplete
              {...props}
              options={options}
              getOptionLabel={(option: any) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  variant="outlined"
                  margin="normal"
                />
              )}
              onChange={(_, data) => props.onChange(data)}
            />
          )}
        />
      );
    }
    return (
      <Controller
        defaultValue={options[0].value}
        name={name}
        as={
          <Select fullWidth variant="outlined">
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        }
      />
    );
  }

  return null;
};

export default FieldComponent;
