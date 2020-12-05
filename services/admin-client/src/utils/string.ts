export const parsePhoneNumber = (phone: string): string =>
  `(${phone.substr(0, 2)}) ${phone.substr(2, 5)}-${phone.substr(7)}`;
