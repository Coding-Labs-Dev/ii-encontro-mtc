import React from 'react';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import bemHelper from 'lib/bem';

import styles from './Fields.module.scss';

import { ErrorMessage } from './CheckoutFields';

const bem = bemHelper(styles, 'Fields');

export interface Props {
  fields: Array<{
    name: string;
    type: string;
    label: string;
    placeholder: string;
    size: string;
    props: any;
    mask: string | null;
    options: any;
    defaultValue: any;
  }>;
  register: Function;
  errors: { [key: string]: { message: string; name: string; type: string } };
  handleChange(): void;
}

const Fields: React.FC<Props> = ({
  fields,
  register,
  errors,
  handleChange,
}) => (
  <>
    {fields.map(
      ({
        name,
        type,
        label,
        placeholder,
        props,
        mask = null,
        options = null,
        defaultValue = null,
      }) => (
        <div className={bem.b()} key={`form_${name}`}>
          <label htmlFor={name}>{label}</label>
          {!options ? (
            // @ts-ignore
            <InputMask
              ref={register({ name, type }, props)}
              type={type}
              name={name}
              className={errors[name] ? 'error' : ''}
              placeholder={placeholder}
              onChange={handleChange}
              defaultValue={defaultValue}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...mask}
            />
          ) : (
            <Select
              ref={register({ name, type }, props)}
              // type={type}
              name={name}
              className={errors[name] ? 'error' : ''}
              placeholder={placeholder}
              onChange={handleChange}
              // {...mask}
              options={options}
              styles={{
                container: (stls) => ({
                  ...stls,
                  width: '100%',
                }),
                control: (stls) => ({
                  ...stls,
                  backgroundColor: errors[name]
                    ? 'rgba(255, 71, 87, 0.2)'
                    : 'inherit',
                  borderColor: errors[name] ? '#ff4757' : 'inherint',
                }),
                placeholder: (stls) => ({
                  ...stls,
                  opacity: 0.5,
                }),
              }}
            />
          )}
          <ErrorMessage errors={errors} name={name} />
        </div>
      )
    )}
  </>
);

export default Fields;
