import { Field } from 'components/Field';
import * as yup from 'yup';

export interface FormSchema {
  internal: {
    sender: {
      fullPhone: string;
    };
    shipping: {
      state: { value: string; label: string };
    };
    billingAddress: {
      state: { value: string; label: string };
    };
    creditCard: {
      number: string;
      expirationDate: string;
      securityToken: string;
      expirationMonth: string;
      expirationYear: string;
    };
    holder: {
      fullPhone: string;
    };
    paymentMethod: { value: string; label: string };
  };
  other: {
    referer: string;
    location: string;
  };
  sender: {
    name: string;
    hash: string;
    documents: {
      document: {
        type: 'CPF';
        value: string;
      };
    };
    email: string;
    phone: {
      areaCode: string;
      number: string;
    };
    birthDate: string;
  };
  shipping: {
    street: string;
    complement: string;
    number: string;
    district: string;
    city: string;
    state: string;
    postalCode: string;
  };
  creditCard: {
    token: string;
    holder: {
      name: string;
      documents: {
        document: {
          type: 'CPF';
          value: string;
        };
      };
      phone: {
        areaCode: string;
        number: string;
      };
      birthDate: string;
    };
  };
  billingAddress: {
    street: string;
    complement: string;
    number: string;
    district: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export const validationSchema = yup.object<FormSchema>().shape({
  other: yup.object().shape({
    billingSameAsShipping: yup.boolean(),
    referer: yup
      .string()
      .max(50, 'O nome não pode conter mais que 50 caracteres.'),
  }),
  internal: yup.object().shape({
    sender: yup.object().shape({
      documents: yup.object().shape({
        document: yup.object().shape({
          value: yup
            .string()
            .required('Este campo é obrigatório')
            .test({
              name: 'cpf',
              message: 'CPF inválido',
              test: (value: any) => {
                if (!value) return true;
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
            }),
        }),
      }),
      fullPhone: yup
        .string()
        .required('Este campo é obrigatório')
        .test({
          name: 'phone',
          test: (value: any) => value.replace(/\D/g, '').length === 11,
          message: 'Telefone inválido',
        }),
    }),
    shipping: yup.object().shape({
      state: yup.string().required('Este campo é obrigatório'),
      postalCode: yup
        .string()
        .required('Este campo é obrigatório')
        .test({
          name: 'zip',
          message: 'CEP inválido',
          test: (value: any) => /^([0-9]){5}[-]([0-9]){3}$/.test(value),
        }),
    }),
    billingAddress: yup.object().shape({
      state: yup.string(),
      postalCode: yup.string().test({
        name: 'zip',
        message: 'CEP inválido',
        test: (value: any) => {
          if (!value) return true;
          return /^([0-9]){5}[-]([0-9]){3}$/.test(value);
        },
      }),
    }),
    creditCard: yup.object().shape({
      number: yup.string().required('Este campo é obrigatório'),
      expirationDate: yup
        .string()
        .required('Este campo é obrigatório')
        .test({
          name: 'expDate',
          test: (value: any) => /^(0[1-9]|1[012])[ -/]\d\d$/i.test(value),
          message: 'Data inválida.',
        }),
      securityToken: yup.string().required('Este campo é obrigatório'),
      holder: yup.object().shape({
        documents: yup.object().shape({
          document: yup.object().shape({
            value: yup.string().test({
              name: 'cpf',
              message: 'CPF inválido',
              test: (value: any) => {
                if (!value) return true;
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
            }),
          }),
        }),
        fullPhone: yup.string(),
      }),
    }),
  }),
  sender: yup.object().shape({
    name: yup
      .string()
      .required('Este campo é obrigatório')
      .max(50, 'O nome não pode conter mais que 50 caracteres.')
      .test({
        name: 'name',
        test: (value: any) =>
          /^[A-zÀ-ÿ']+(\s)([A-zÀ-ÿ']\s?)*[A-zÀ-ÿ']+$/.test(value),
        message: 'Nome inválido. Digite o nome completo',
      }),
    email: yup.string().email().required('Este campo é obrigatório'),
    birthDate: yup
      .string()
      .required('Este campo é obrigatório')
      .test({
        name: 'birhtDate',
        test: (value: any) =>
          /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19[2-9][0-9]|20[01][0-9])$/.test(
            value
          ),
        message: 'Data de nascimento inválida',
      }),
  }),
  shipping: yup.object().shape({
    street: yup
      .string()
      .required('Este campo é obrigatório')
      .min(2, 'O endereço não pode conter menos que 2 caracteres.')
      .max(80, 'O endereço não pode conter mais que 80 caracteres.'),
    complement: yup
      .string()
      .required('Este campo é obrigatório')
      .min(2, 'O complemento não pode conter menos que 2 caracteres.')
      .max(80, 'O complemento não pode conter mais que 80 caracteres.'),
    number: yup
      .string()
      .required('Este campo é obrigatório')
      .max(20, 'O número não pode conter mais que 20 caracteres.')
      .test({
        name: 'number',
        message: 'Campo inválido',
        test: (value: any) => !/\D/g.test(value),
      }),
    district: yup
      .string()
      .required('Este campo é obrigatório')
      .min(2, 'O bairro não pode conter menos que 2 caracteres.')
      .max(40, 'O bairro não pode conter mais que 40 caracteres.'),
    city: yup
      .string()
      .required('Este campo é obrigatório')
      .min(2, 'A cidade não pode conter menos que 2 caracteres.')
      .max(60, 'A cidade não pode conter mais que 60 caracteres.'),
  }),
  creditCard: yup.object().shape({
    holder: yup.object().shape({
      name: yup
        .string()
        .required('Este campo é obrigatório')
        .test({
          name: 'name',
          test: (value: any) =>
            /^[A-zÀ-ÿ']+(\s)([A-zÀ-ÿ']\s?)*[A-zÀ-ÿ']+$/.test(value),
          message: 'Nome inválido. Digite o nome completo',
        }),
      birthDate: yup.string().test({
        name: 'birhtDate',
        test: (value: any) => {
          if (!value) return true;
          return /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19[2-9][0-9]|20[01][0-9])$/.test(
            value
          );
        },
        message: 'Data de nascimento inválida',
      }),
    }),
  }),
  billingAddress: yup.object().shape({
    street: yup.string().when('other.billingSameAsShipping', {
      is: false,
      then: yup
        .string()
        .required('Este campo é obrigatório')
        .min(2, 'O endereço não pode conter menos que 2 caracteres.')
        .max(80, 'O endereço não pode conter mais que 80 caracteres.'),
    }),
    complement: yup.string().when('other.billingSameAsShipping', {
      is: false,
      then: yup
        .string()
        .required('Este campo é obrigatório')
        .min(2, 'O complemento não pode conter menos que 2 caracteres.')
        .max(80, 'O complemento não pode conter mais que 80 caracteres.'),
    }),
    number: yup.string().when('other.billingSameAsShipping', {
      is: false,
      then: yup
        .string()
        .required('Este campo é obrigatório')
        .max(20, 'O número não pode conter mais que 20 caracteres.'),
    }),
    district: yup.string().when('other.billingSameAsShipping', {
      is: false,
      then: yup
        .string()
        .required('Este campo é obrigatório')
        .min(2, 'O bairro não pode conter menos que 2 caracteres.')
        .max(40, 'O bairro não pode conter mais que 40 caracteres.'),
    }),
    city: yup.string().when('other.billingSameAsShipping', {
      is: false,
      then: yup
        .string()
        .required('Este campo é obrigatório')
        .min(2, 'A cidade não pode conter menos que 2 caracteres.')
        .max(60, 'A cidade não pode conter mais que 60 caracteres.'),
    }),
  }),
});

const states = [
  {
    label: 'Acre',
    value: 'AC',
  },
  {
    label: 'Alagoas',
    value: 'AL',
  },
  {
    label: 'Amapá',
    value: 'AP',
  },
  {
    label: 'Amazonas',
    value: 'AM',
  },
  {
    label: 'Bahia',
    value: 'BA',
  },
  {
    label: 'Ceará',
    value: 'CE',
  },
  {
    label: 'Distrito Federal',
    value: 'DF',
  },
  {
    label: 'Espírito Santo',
    value: 'ES',
  },
  {
    label: 'Goiás',
    value: 'GO',
  },
  {
    label: 'Maranhão',
    value: 'MA',
  },
  {
    label: 'Mato Grosso',
    value: 'MT',
  },
  {
    label: 'Mato Grosso do Sul',
    value: 'MS',
  },
  {
    label: 'Minas Gerais',
    value: 'MG',
  },
  {
    label: 'Pará',
    value: 'PA',
  },
  {
    label: 'Paraíba',
    value: 'PB',
  },
  {
    label: 'Paraná',
    value: 'PR',
  },
  {
    label: 'Pernambuco',
    value: 'PE',
  },
  {
    label: 'Piauí',
    value: 'PI',
  },
  {
    label: 'Rio de Janeiro',
    value: 'RJ',
  },
  {
    label: 'Rio Grande do Norte',
    value: 'RN',
  },
  {
    label: 'Rio Grande do Sul',
    value: 'RS',
  },
  {
    label: 'Rondônia',
    value: 'RO',
  },
  {
    label: 'Roraima',
    value: 'RR',
  },
  {
    label: 'Santa Catarina',
    value: 'SC',
  },
  {
    label: 'São Paulo',
    value: 'SP',
  },
  {
    label: 'Sergipe',
    value: 'SE',
  },
  {
    label: 'Tocantins',
    value: 'TO',
  },
];

export const fields: { [key: string]: Array<Field> } = {
  hidden: [
    {
      name: 'reference',
      type: 'hidden',
      defaultValue: 'IIEncontroMTC',
    },
    {
      name: 'items.item.id',
      type: 'hidden',
      defaultValue: 'II Encontro MTC',
    },
    {
      name: 'items.item.description',
      type: 'hidden',
      defaultValue: 'Taxa de inscrição do II Encontro MTC',
    },
    {
      name: 'items.item.quantity',
      type: 'hidden',
      defaultValue: '1',
    },
    {
      name: 'items.item.amount',
      type: 'hidden',
    },
    {
      name: 'creditCard.installment.quantity',
      type: 'hidden',
    },
    {
      name: 'creditCard.installment.value',
      type: 'hidden',
    },
    {
      name: 'other.paymentTotal',
      type: 'hidden',
    },
    {
      name: 'shipping.postalCode',
      type: 'hidden',
    },
    {
      name: 'billingAddress.postalCode',
      type: 'hidden',
    },
    {
      name: 'sender.documents.document.value',
      type: 'hidden',
    },
    {
      name: 'creditCard.holder.documents.document.value',
      type: 'hidden',
    },
  ],
  location: [
    {
      name: 'other.location',
      type: 'radio',
      label: 'Local',
      options: [
        {
          value: 'campinas',
          label: 'Campinas',
        },
        {
          value: 'online',
          label: 'Online',
        },
      ],
    },
  ],
  sender: [
    {
      name: 'other.referer',
      type: 'text',
      label: 'Indicação',
      placeholder: 'Se você foi indicado por alguém, digite o nome',
    },
    {
      name: 'sender.hash',
      type: 'hidden',
    },
    {
      name: 'sender.name',
      type: 'text',
      label: 'Nome Completo',
      placeholder: 'Digite o seu nome e sobrenome',
    },
    {
      name: 'sender.documents.document.type',
      type: 'hidden',
      defaultValue: 'CPF',
    },
    {
      name: 'internal.sender.documents.document.value',
      type: 'tel',
      label: 'CPF',
      placeholder: '000.000.000-00',
      mask: {
        mask: '999.999.999-99',
        maskChar: '_',
      },
    },
    {
      name: 'sender.email',
      type: 'email',
      label: 'E-mail',
      placeholder: 'Digite o seu e-mail',
    },
    {
      name: 'sender.phone.areaCode',
      type: 'hidden',
    },
    {
      name: 'sender.phone.number',
      type: 'hidden',
    },
    {
      name: 'internal.sender.fullPhone',
      type: 'tel',
      label: 'Telefone',
      placeholder: '(00) 00000-0000',
      mask: {
        mask: '(99) 99999-9999',
        maskChar: '_',
      },
    },
    {
      name: 'sender.birthDate',
      type: 'tel',
      label: 'Data de Nascimento',
      placeholder: 'DD/MM/AAAA',
      mask: {
        mask: '99/99/9999',
        maskChar: '_',
      },
    },
  ],
  shipping: [
    {
      name: 'shipping.street',
      type: 'text',
      label: 'Endereço',
      placeholder: 'Rua, Avenida, Condomínio, Bloco, etc..',
    },
    {
      name: 'shipping.complement',
      type: 'text',
      label: 'Complemento',
      placeholder: 'Digite o complemento',
    },
    {
      name: 'shipping.number',
      type: 'tel',
      label: 'Número',
      placeholder: 'Digite o número',
    },
    {
      name: 'shipping.district',
      type: 'text',
      label: 'Bairro',
      placeholder: 'Digite o bairro',
    },
    {
      name: 'shipping.city',
      type: 'text',
      label: 'Cidade',
      placeholder: 'Digite a cidade',
    },
    {
      name: 'shipping.state',
      type: 'hidden',
    },
    {
      name: 'internal.shipping.state',
      type: 'select',
      label: 'Estado',
      placeholder: 'Escolha o estado',
      autoComplete: true,
      options: states,
    },
    {
      name: 'internal.shipping.postalCode',
      type: 'tel',
      label: 'CEP',
      placeholder: 'Digite o CEP',
      mask: {
        mask: '99999-999',
        maskChar: '_',
      },
    },
  ],
  creditCard: [
    {
      name: 'creditCard.token',
      type: 'hidden',
    },
    {
      name: 'creditCard.holder.name',
      type: 'text',
      label: 'Nome do Titular do Cartão',
      placeholder: 'Digite o nome conforme no cartão',
    },
    {
      name: 'internal.creditCard.number',
      type: 'tel',
      label: 'Número do Cartão de Crédito',
      placeholder: '0000 0000 0000 0000',
      mask: {
        mask: '9999 9999 9999 9999',
        maskChar: ' ',
      },
    },
    {
      name: 'internal.creditCard.expirationDate',
      type: 'tel',
      label: 'Data de expiração',
      placeholder: 'MM/AA',
      mask: {
        mask: '99/99',
        maskChar: ' ',
      },
    },
    {
      name: 'internal.creditCard.expirationMonth',
      type: 'hidden',
    },
    {
      name: 'internal.creditCard.expirationYear',
      type: 'hidden',
    },
    {
      name: 'internal.creditCard.securityToken',
      type: 'tel',
      label: 'CCV',
      placeholder: 'Código de Segurança',
      mask: {
        mask: '99999',
        maskChar: ' ',
      },
    },
  ],
  paymentMethod: [
    {
      name: 'internal.paymentMethod',
      type: 'radio',
      label: 'Forma de Pagamento',
      options: [
        { value: 'single', label: 'À vista' },
        { value: 'installments', label: 'Parcelado' },
      ],
    },
  ],
  billingSameAsShipping: [
    {
      name: 'other.billingSameAsShipping',
      type: 'checkbox',
      label: 'Mesmos dados do inscrito',
      defaultChecked: true,
    },
  ],
  creditCardHolder: [
    {
      name: 'creditCard.holder.documents.document.type',
      type: 'hidden',
      defaultValue: 'CPF',
    },
    {
      name: 'internal.creditCard.holder.documents.document.value',
      type: 'tel',
      label: 'CPF',
      placeholder: '000.000.000-00',
      mask: {
        mask: '999.999.999-99',
        maskChar: '_',
      },
    },
    {
      name: 'creditCard.holder.phone.areaCode',
      type: 'hidden',
    },
    {
      name: 'creditCard.holder.phone.number',
      type: 'hidden',
    },
    {
      name: 'internal.creditCard.holder.fullPhone',
      type: 'tel',
      label: 'Telefone',
      placeholder: '(00) 00000-0000',
      mask: {
        mask: '(99) 99999-9999',
        maskChar: '_',
      },
    },
    {
      name: 'creditCard.holder.birthDate',
      type: 'tel',
      label: 'Data de Nascimento',
      placeholder: 'DD/MM/AAAA',
      mask: {
        mask: '99/99/9999',
        maskChar: '_',
      },
    },
  ],
  billing: [
    {
      name: 'billingAddress.street',
      type: 'text',
      label: 'Endereço',
      placeholder: 'Rua, Avenida, Condomínio, Bloco, etc..',
    },
    {
      name: 'billingAddress.complement',
      type: 'text',
      label: 'Complemento',
      placeholder: 'Digite o complemento',
    },
    {
      name: 'billingAddress.number',
      type: 'tel',
      label: 'Número',
      placeholder: 'Digite o número',
    },
    {
      name: 'billingAddress.district',
      type: 'text',
      label: 'Bairro',
      placeholder: 'Digite o bairro',
    },
    {
      name: 'billingAddress.city',
      type: 'text',
      label: 'Cidade',
      placeholder: 'Digite a cidade',
    },
    {
      name: 'billingAddress.state',
      type: 'hidden',
    },
    {
      name: 'internal.billingAddress.state',
      type: 'select',
      label: 'Estado',
      placeholder: 'Escolha o estado',
      autoComplete: true,
      options: states,
    },
    {
      name: 'internal.billingAddress.postalCode',
      type: 'tel',
      label: 'CEP',
      placeholder: 'Digite o CEP',
      mask: {
        mask: '99999-999',
        maskChar: '_',
      },
    },
  ],
};

export default fields;
