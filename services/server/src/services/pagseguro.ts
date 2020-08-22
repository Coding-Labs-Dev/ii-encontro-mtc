import PagSeguro from '@luismramirezr/pagseguro';

const {
  EMAIL: email,
  TOKEN: token,
  SANDBOX: sandbox,
  SANDBOX_EMAIL: sandboxEmail,
} = process.env;

class PagSeguroSingleton {
  static instance: typeof PagSeguro;
  private constructor() {
    return new PagSeguro({
      email,
      token,
      sandbox: !!sandbox,
      sandboxEmail,
    });
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new PagSeguroSingleton();
    }

    return this.instance;
  }
}

export default PagSeguroSingleton.getInstance();
