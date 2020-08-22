import { dot } from 'dot-object';

import { enMessages, ptMessages } from './locales';

const formatMessages = (messages: any): { [key: string]: string } =>
  dot(messages);

const formattedMessages = {
  pt: formatMessages(ptMessages),
  en: formatMessages(enMessages),
};

export default formattedMessages;
