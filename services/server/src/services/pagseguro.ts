// import PagSeguro from '@luismramirezr/pagseguro';
import PagSeguro from './PagSeguro_';

const {
  EMAIL: email,
  TOKEN: token,
  SANDBOX: sandbox,
  SANDBOX_EMAIL: sandboxEmail,
} = process.env;

class PagSeguroSingleton {
  static instance: PagSeguro;
  private constructor() {
    return new PagSeguro({
      email: email || '',
      token: token || '',
      sandbox: !!sandbox,
      sandboxEmail,
    });
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new PagSeguroSingleton() as PagSeguro;
    }

    return this.instance;
  }
}

export default PagSeguroSingleton.getInstance();
