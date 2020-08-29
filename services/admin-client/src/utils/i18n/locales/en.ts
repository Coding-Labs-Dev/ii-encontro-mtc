export default {
  Application: {
    Name: 'SBCMTC',
  },
  Navigation: {
    Dashboard: {
      Title: 'Dashboard',
    },
    Clients: {
      Title: 'Clients',
    },
    Entries: {
      Title: 'Entries',
    },
    Transactions: {
      Title: 'Transactions',
    },
  },
  Forms: {
    Errors: {
      Required: 'This field is required',
      InvalidEmail: 'The email must be valid',
    },
  },
  Pages: {
    SignIn: {
      Fields: {
        Email: {
          Placeholder: 'Email',
        },
        Password: {
          Placeholder: 'Password',
        },
      },
      Buttons: {
        RememberMe: 'Remember me',
        LogIn: 'Log In',
        ForgotPassword: 'Forgot Password?',
      },
    },
    Clients: {
      Title: 'Clients',
      Table: {
        Headers: {
          Name: 'Name',
          CPF: 'CPF',
          Email: 'Email',
          Phone: 'Phone',
        },
      },
    },
    Transactions: {
      Title: 'Transactions',
      Table: {
        Headers: {
          Code: 'Code',
          Client: 'Client',
          Location: 'Location',
          Reference: 'Reference',
          Status: 'Status',
          Date: 'Date',
          PaymentMethod: 'Payment Method',
          paymentLink: 'Payment URL',
          grossAmount: 'Gross Amount',
          feeAmount: 'Fee Amount',
          netAmount: 'Net Amount',
          extraAmount: 'Extra Amount',
          installmentCount: 'Installments',
        },
      },
    },
  },
};
