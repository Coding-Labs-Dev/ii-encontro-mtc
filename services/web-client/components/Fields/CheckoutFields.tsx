import React from 'react';

interface ErrorMessageProps {
  errors: { [key: string]: { message: string; type: string } };
  name: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, name }) => {
  if (!errors[name]) {
    return null;
  }
  if (errors[name].message) {
    return <span className="form-error">{errors[name].message}</span>;
  }
  if (errors[name].type === 'validate') {
    if (name === 'cpf') {
      return <span className="form-error">CPF inválido</span>;
    }
  }

  return null;
};

export const fields = {
  sender: [
    {
      name: 'referer',
      type: 'text',
      label: 'Indicação',
      placeholder: 'Se você foi indicado por alguém, digite o nome',
      props: {
        maxLength: {
          value: 50,
          message: 'O nome não pode conter mais que 50 caracteres.',
        },
      },
    },
    {
      name: 'sender.senderName',
      type: 'text',
      label: 'Nome Completo',
      placeholder: 'Digite o seu nome e sobrenome',
      props: {
        required: 'Este campo é obrigatório',
        maxLength: {
          value: 50,
          message: 'O nome não pode conter mais que 50 caracteres.',
        },
        pattern: {
          value: /^[A-zÀ-ÿ']+(\s)([A-zÀ-ÿ']\s?)*[A-zÀ-ÿ']+$/,
          message: 'Nome inválido. Digite o nome completo',
        },
      },
    },
    {
      name: 'sender.senderCPF',
      type: 'tel',
      label: 'CPF',
      placeholder: '000.000.000-00',
      size: 'half',
      props: {
        required: 'Este campo é obrigatório',
        validate: (value: any) => {
          const cpf = String(value).replace(/\D/g, '');

          if (cpf.length < 11 || !Number(cpf)) {
            return false;
          }

          const chars = [];
          for (let i = 0; i < 11; i += 1) {
            chars.push(Number(cpf.charAt(i)));
          }
          for (let i = 9; i < 11; i += 1) {
            // eslint-disable-next-line arrow-body-style
            const verificador = chars.map((char, index) => {
              return index < i ? char * (1 + i - index) : 0;
            });
            // eslint-disable-next-line arrow-body-style
            const soma = verificador.reduce((a, b) => {
              return a + b;
            }, 0);

            const resto = [10, 11].includes((soma * 10) % 11)
              ? 0
              : (soma * 10) % 11;
            if (resto !== chars[i]) {
              return false;
            }
          }
          return true;
        },
      },
      mask: {
        mask: '999.999.999-99',
        maskChar: '_',
      },
    },
    {
      name: 'sender.senderEmail',
      type: 'email',
      label: 'E-mail',
      placeholder: 'Digite o seu e-mail',
      size: 'half',
      props: {
        required: 'Este campo é obrigatório',
        pattern: {
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'E-mail inválido',
        },
        maxLength: {
          value: 60,
          message: 'O e-mail não pode conter mais que 60 caracteres.',
        },
      },
    },
    {
      name: 'sender.senderFullPhone',
      type: 'tel',
      label: 'Telefone',
      placeholder: '(00) 00000-0000',
      size: 'half',
      props: {
        required: 'Este campo é obrigatório',
        pattern: {
          value: /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/,
          message: 'Telefone inválido',
        },
      },
      mask: {
        mask: '(99) 99999-9999',
        maskChar: '_',
      },
    },
    {
      name: 'sender.senderBirthDate',
      type: 'tel',
      label: 'Data de Nascimento',
      size: 'half',
      placeholder: 'DD/MM/AAAA',
      props: {
        required: 'Este campo é obrigatório',
        pattern: {
          value: /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19[2-9][0-9]|20[01][0-9])$/,
          message: 'Data de nascimento inválida',
        },
      },
      mask: {
        mask: '99/99/9999',
        maskChar: '_',
      },
    },
  ],
  shipping: [
    {
      name: 'shippingAddress.shippingAddressStreet',
      type: 'text',
      label: 'Endereço',
      placeholder: 'Rua, Avenida, Condomínio, Bloco, etc..',
      props: {
        required: 'Este campo é obrigatório',
        minLength: {
          value: 2,
          message: 'O endereço não pode conter menos que 2 caracteres.',
        },
        maxLength: {
          value: 80,
          message: 'O endereço não pode conter mais que 80 caracteres.',
        },
      },
    },
    {
      name: 'shippingAddress.shippingAddressComplement',
      type: 'text',
      label: 'Complemento',
      placeholder: 'Digite o complemento',
      props: {
        required: 'Este campo é obrigatório',
        minLength: {
          value: 2,
          message: 'O complemento não pode conter menos que 2 caracteres.',
        },
        maxLength: {
          value: 80,
          message: 'O complemento não pode conter mais que 80 caracteres.',
        },
      },
    },
    {
      name: 'shippingAddress.shippingAddressNumber',
      type: 'tel',
      label: 'Número',
      size: 'half',
      placeholder: 'Digite o número',
      props: {
        required: 'Este campo é obrigatório',
        maxLength: {
          value: 20,
          message: 'O número não pode conter mais que 20 caracteres.',
        },
      },
    },
    {
      name: 'shippingAddress.shippingAddressDistrict',
      type: 'text',
      label: 'Bairro',
      size: 'half',
      placeholder: 'Digite o bairro',
      props: {
        required: 'Este campo é obrigatório',
        minLength: {
          value: 2,
          message: 'O bairro não pode conter menos que 2 caracteres.',
        },
        maxLength: {
          value: 40,
          message: 'O bairro não pode conter mais que 40 caracteres.',
        },
      },
    },
    {
      name: 'shippingAddress.shippingAddressCity',
      type: 'text',
      label: 'Cidade',
      size: 'half',
      placeholder: 'Digite a cidade',
      minLength: {
        value: 2,
        message: 'A cidade não pode conter menos que 2 caracteres.',
      },
      props: {
        required: 'Este campo é obrigatório',
        maxLength: {
          value: 60,
          message: 'A cidade não pode conter mais que 60 caracteres.',
        },
      },
    },
    {
      name: 'shippingAddress.shippingAddressState',
      type: 'text',
      label: 'Estado',
      size: 'half',
      placeholder: 'Escolha o estado',
      options: [
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Acre',
          value: 'AC',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Alagoas',
          value: 'AL',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Amapá',
          value: 'AP',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Amazonas',
          value: 'AM',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Bahia',
          value: 'BA',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Ceará',
          value: 'CE',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Distrito Federal',
          value: 'DF',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Espírito Santo',
          value: 'ES',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Goiás',
          value: 'GO',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Maranhão',
          value: 'MA',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Mato Grosso',
          value: 'MT',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Mato Grosso do Sul',
          value: 'MS',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Minas Gerais',
          value: 'MG',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Pará',
          value: 'PA',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Paraíba',
          value: 'PB',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Paraná',
          value: 'PR',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Pernambuco',
          value: 'PE',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Piauí',
          value: 'PI',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Rio de Janeiro',
          value: 'RJ',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Rio Grande do Norte',
          value: 'RN',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Rio Grande do Sul',
          value: 'RS',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Rondônia',
          value: 'RO',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Roraima',
          value: 'RR',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Santa Catarina',
          value: 'SC',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'São Paulo',
          value: 'SP',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Sergipe',
          value: 'SE',
        },
        {
          name: 'shippingAddress.shippingAddressState',
          label: 'Tocantins',
          value: 'TO',
        },
      ],
      props: {
        required: 'Este campo é obrigatório',
        minLength: {
          value: 2,
          message: 'O estado não pode conter menos que 2 caracteres.',
        },
        maxLength: {
          value: 2,
          message: 'O estado não pode conter mais que 2 caracteres.',
        },
        pattern: {
          value: /(A(C|L|P|M))|BA|(CE)|(DF)|(GO)|(ES)|(M(A|T|S|G))|(P(A|B|R|E|I))|(R(J|N|S|O|R))|(S(P|C|E))|(TO)/,
          message: 'Estado inválido',
        },
      },
    },
    {
      name: 'shippingAddress.shippingAddressPostalCode',
      type: 'tel',
      label: 'CEP',
      size: 'half',
      placeholder: 'Digite o CEP',
      props: {
        required: 'Este campo é obrigatório',
        pattern: {
          value: /^([0-9]){5}[-]([0-9]){3}$/,
          message: 'CEP inválido',
        },
      },
      mask: {
        mask: '99999-999',
        maskChar: '_',
      },
    },
  ],
  creditCard: [
    {
      name: 'creditCard.holder.creditCardHolderName',
      type: 'text',
      label: 'Nome do Titular do Cartão',
      placeholder: 'Digite o nome conforme no cartão',
      props: {
        required: 'Digite o nome do titular do cartão',
        pattern: {
          value: /^[A-zÀ-ÿ']+(\s)([A-zÀ-ÿ']\s?)*[A-zÀ-ÿ']+$/,
          message: 'Nome inválido. Digite o nome completo',
        },
      },
    },
    {
      name: 'creditCard.number',
      type: 'tel',
      label: 'Número do Cartão de Crédito',
      placeholder: '0000 0000 0000 0000',
      mask: {
        mask: '9999 9999 9999 9999',
        maskChar: ' ',
      },
      props: {
        required: 'Digite o número do cartão',
        // pattern: {
        //   value: /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g,
        //   message: 'Cartão de crédito inválido',
        // },
      },
    },
    {
      name: 'creditCard.expirationDate',
      type: 'tel',
      label: 'Data de expiração',
      placeholder: 'MM/AA',
      size: 'half',
      mask: {
        mask: '99/99',
        maskChar: ' ',
      },
      props: {
        required: 'Digite a data de validade',
        pattern: {
          value: /^(0[1-9]|1[012])[ -/]\d\d$/i,
          message: 'Data inválida.',
        },
      },
    },
    {
      name: 'creditCard.securityToken',
      type: 'tel',
      label: 'CCV',
      placeholder: 'Código de Segurança',
      size: 'half',
      mask: {
        mask: '99999',
        maskChar: ' ',
      },
      props: {
        required: 'Digite o código de segurança',
      },
    },
  ],
  creditCardHolder: [
    {
      name: 'creditCard.holder.creditCardHolderCPF',
      type: 'tel',
      label: 'CPF',
      placeholder: '000.000.000-00',
      size: 'half',
      props: {
        required: 'Este campo é obrigatório',
        validate: (value: any) => {
          const cpf = String(value).replace(/\D/g, '');

          if (cpf.length < 11 || !Number(cpf)) {
            return false;
          }

          const chars = [];
          for (let i = 0; i < 11; i += 1) {
            chars.push(Number(cpf.charAt(i)));
          }
          for (let i = 9; i < 11; i += 1) {
            // eslint-disable-next-line arrow-body-style
            const verificador = chars.map((char, index) => {
              return index < i ? char * (1 + i - index) : 0;
            });
            // eslint-disable-next-line arrow-body-style
            const soma = verificador.reduce((a, b) => {
              return a + b;
            }, 0);

            const resto = [10, 11].includes((soma * 10) % 11)
              ? 0
              : (soma * 10) % 11;
            if (resto !== chars[i]) {
              return false;
            }
          }
          return true;
        },
      },
      mask: {
        mask: '999.999.999-99',
        maskChar: '_',
      },
    },
    {
      name: 'creditCard.holder.creditCardHolderFullPhone',
      type: 'tel',
      label: 'Telefone',
      placeholder: '(00) 00000-0000',
      size: 'half',
      props: {
        required: 'Este campo é obrigatório',
        pattern: {
          value: /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/,
          message: 'Telefone inválido',
        },
      },
      mask: {
        mask: '(99) 99999-9999',
        maskChar: '_',
      },
    },
    {
      name: 'creditCard.holder.creditCardHolderBirthDate',
      type: 'tel',
      label: 'Data de Nascimento',
      size: 'half',
      placeholder: 'DD/MM/AAAA',
      props: {
        required: 'Este campo é obrigatório',
        pattern: {
          value: /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19[2-9][0-9]|20[01][0-9])$/,
          message: 'Data de nascimento inválida',
        },
      },
      mask: {
        mask: '99/99/9999',
        maskChar: '_',
      },
    },
  ],
  billing: [
    {
      name: 'billingAddress.billingAddressStreet',
      type: 'text',
      label: 'Endereço',
      placeholder: 'Rua, Avenida, Condomínio, Bloco, etc..',
      props: {
        required: 'Este campo é obrigatório',
        minLength: {
          value: 2,
          message: 'O endereço não pode conter menos que 2 caracteres.',
        },
        maxLength: {
          value: 80,
          message: 'O endereço não pode conter mais que 80 caracteres.',
        },
      },
    },
    {
      name: 'billingAddress.billingAddressComplement',
      type: 'text',
      label: 'Complemento',
      placeholder: 'Digite o complemento',
      props: {
        required: 'Este campo é obrigatório',
        minLength: {
          value: 2,
          message: 'O complemento não pode conter menos que 2 caracteres.',
        },
        maxLength: {
          value: 80,
          message: 'O complemento não pode conter mais que 80 caracteres.',
        },
      },
    },
    {
      name: 'billingAddress.billingAddressNumber',
      type: 'tel',
      label: 'Número',
      size: 'half',
      placeholder: 'Digite o número',
      props: {
        required: 'Este campo é obrigatório',
        maxLength: {
          value: 20,
          message: 'O número não pode conter mais que 20 caracteres.',
        },
      },
    },
    {
      name: 'billingAddress.billingAddressDistrict',
      type: 'text',
      label: 'Bairro',
      size: 'half',
      placeholder: 'Digite o bairro',
      props: {
        required: 'Este campo é obrigatório',
        minLength: {
          value: 2,
          message: 'O bairro não pode conter menos que 2 caracteres.',
        },
        maxLength: {
          value: 40,
          message: 'O bairro não pode conter mais que 40 caracteres.',
        },
      },
    },
    {
      name: 'billingAddress.billingAddressCity',
      type: 'text',
      label: 'Cidade',
      size: 'half',
      placeholder: 'Digite a cidade',
      minLength: {
        value: 2,
        message: 'A cidade não pode conter menos que 2 caracteres.',
      },
      props: {
        required: 'Este campo é obrigatório',
        maxLength: {
          value: 60,
          message: 'A cidade não pode conter mais que 60 caracteres.',
        },
      },
    },
    {
      name: 'billingAddress.billingAddressState',
      type: 'text',
      label: 'Estado',
      size: 'half',
      placeholder: 'Escolha o estado',
      options: [
        {
          name: 'billingAddress.billingAddressState',
          label: 'Acre',
          value: 'AC',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Alagoas',
          value: 'AL',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Amapá',
          value: 'AP',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Amazonas',
          value: 'AM',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Bahia',
          value: 'BA',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Ceará',
          value: 'CE',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Distrito Federal',
          value: 'DF',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Espírito Santo',
          value: 'ES',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Goiás',
          value: 'GO',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Maranhão',
          value: 'MA',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Mato Grosso',
          value: 'MT',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Mato Grosso do Sul',
          value: 'MS',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Minas Gerais',
          value: 'MG',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Pará',
          value: 'PA',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Paraíba',
          value: 'PB',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Paraná',
          value: 'PR',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Pernambuco',
          value: 'PE',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Piauí',
          value: 'PI',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Rio de Janeiro',
          value: 'RJ',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Rio Grande do Norte',
          value: 'RN',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Rio Grande do Sul',
          value: 'RS',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Rondônia',
          value: 'RO',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Roraima',
          value: 'RR',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Santa Catarina',
          value: 'SC',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'São Paulo',
          value: 'SP',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Sergipe',
          value: 'SE',
        },
        {
          name: 'billingAddress.billingAddressState',
          label: 'Tocantins',
          value: 'TO',
        },
      ],
      props: {
        required: 'Este campo é obrigatório',
        minLength: {
          value: 2,
          message: 'O estado não pode conter menos que 2 caracteres.',
        },
        maxLength: {
          value: 2,
          message: 'O estado não pode conter mais que 2 caracteres.',
        },
        pattern: {
          value: /(A(C|L|P|M))|BA|(CE)|(DF)|(GO)|(ES)|(M(A|T|S|G))|(P(A|B|R|E|I))|(R(J|N|S|O|R))|(S(P|C|E))|(TO)/,
          message: 'Estado inválido',
        },
      },
    },
    {
      name: 'billingAddress.billingAddressPostalCode',
      type: 'tel',
      label: 'CEP',
      size: 'half',
      placeholder: 'Digite o CEP',
      props: {
        required: 'Este campo é obrigatório',
        pattern: {
          value: /^([0-9]){5}[-]([0-9]){3}$/,
          message: 'CEP inválido',
        },
      },
      mask: {
        mask: '99999-999',
        maskChar: '_',
      },
    },
  ],
};

export default fields;
