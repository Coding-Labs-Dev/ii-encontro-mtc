import React from 'react';
import { useIntl, IntlProvider } from 'react-intl';

import formattedMessages from './messages';
import usePersistedState from '../usePersistedState';

export type Locales = 'en' | 'pt';

export const defaultLocale: Locales = 'pt';

const availableLocales: Array<Locales> = ['en', 'pt'];

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
  locale: Locales;
  switchLanguage: (lang: Locales) => void;
  availableLocales: Array<Locales>;
}

export const IntlContext = React.createContext<Intl>({
  locale: defaultLocale,
  switchLanguage: () => undefined,
  availableLocales,
});

const I18nProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = usePersistedState<Locales>(
    'locale',
    defaultLocale
  );
  const [translations, setTranslations] = React.useState(
    formattedMessages[locale]
  );

  const switchLanguage = (lang: Locales) => {
    const newMessages = formattedMessages[lang];
    if (newMessages) {
      setLocale(lang);
      setTranslations(newMessages);
    }
  };

  return (
    <IntlContext.Provider value={{ locale, switchLanguage, availableLocales }}>
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
