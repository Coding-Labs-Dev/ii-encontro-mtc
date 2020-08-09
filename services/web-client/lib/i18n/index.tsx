import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pick } from 'dot-object';

import messages from './messages';

const t = (id: string) => {
  const message: string | undefined = pick(id, messages);
  if (!message) throw new Error(`Can't find translation for ${id}`);
  return message;
};

export const formatted = (id: string, values = {}) => {
  const message: string | undefined = pick(id, messages);
  if (!message) throw new Error(`Can't find translation for ${id}`);
  return <FormattedMessage id={id} defaultMessage={message} values={values} />;
};

export const withPrefix = (prefix: string) => (
  key: string,
  values?: { [key: string]: string | number },
  formated = false
) => {
  if (formated) return formatted(`${prefix}.${key}`, values);
  return t(`${prefix}.${key}`);
};

export default t;
