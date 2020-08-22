import { createIntl, createIntlCache } from 'react-intl';
import { defaultLocale, Locales } from './i18n';
import formattedMessages from './i18n/messages';

const getMessage = (locale: Locales, id: string) => {
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale,
      defaultLocale,
      messages: formattedMessages[locale],
    },
    cache
  );

  return intl.formatMessage({
    id,
  });
};

export const withLocale = (locale: Locales) => (id: string) =>
  getMessage(locale, id);

export const withPrefix = (locale: Locales, prefix: string) => (id: string) =>
  getMessage(locale, `${prefix}.${id}`);

export default getMessage;
