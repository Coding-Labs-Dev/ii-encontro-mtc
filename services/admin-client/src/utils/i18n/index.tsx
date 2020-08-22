import React from 'react';
import { useIntl, IntlProvider } from 'react-intl';

import formattedMessages from './messages';

export type Locales = 'en' | 'pt';

export const defaultLocale: Locales = 'pt';

const useFormatMessage = (id: string, defaultMessage?: string, values?: {}) =>
  useIntl().formatMessage({ id, defaultMessage }, values);

export const t = (id: string, values = {}) => {
  return useFormatMessage(id, undefined, values);
};

export const usePrefix = (prefix: string) => (
  key: string,
  values?: { [key: string]: string | number }
) => t(`${prefix}.${key}`, values);

interface Intl {
  locale?: Locales;
  switchLanguage?: (lang: Locales) => void;
}

export const IntlContext = React.createContext<Intl>({});

const I18nProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = React.useState<Locales>(defaultLocale);
  const [translations, setTranslations] = React.useState(
    formattedMessages[defaultLocale]
  );

  const switchLanguage = (lang: Locales) => {
    const newMessages = formattedMessages[lang];
    if (newMessages) {
      setLocale(lang);
      setTranslations(newMessages);
    }
  };

  return (
    <IntlContext.Provider value={{ locale, switchLanguage }}>
      <IntlProvider
        key={locale}
        locale={locale}
        messages={translations}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export default I18nProvider;
