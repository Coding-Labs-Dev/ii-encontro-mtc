import * as yup from 'yup';
import { withPrefix } from 'utils/getMessage';
import { Locales } from '~/utils/i18n';

export interface Form {
  eml: string;
  psw: string;
  rememberMe: boolean;
}

const createSchema = (locale: Locales) => {
  const getMessage = withPrefix(locale, 'Forms.Errors');
  return yup.object().shape({
    eml: yup
      .string()
      .email(getMessage('InvalidEmail'))
      .required(getMessage('Required')),
    psw: yup.string().required(getMessage('Required')),
  });
};

export default createSchema;
