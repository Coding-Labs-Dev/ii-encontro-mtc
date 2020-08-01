import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pick } from 'dot-object';

import messages from './messages';

const t = (id: string, values = {}, formatted = false) => {
  const message: string | undefined = pick(id, messages);
  if (!message) throw new Error(`Can't find translation for ${id}`);
  if (!Object.keys(values).length && !formatted) return message;

  return <FormattedMessage id={id} defaultMessage={message} values={values} />;
};

export const withPrefix = (prefix: string) => (
  key: string,
  ...rest: [Object, boolean]
) => t(`${prefix}.${key}`, ...rest);

export default t;
