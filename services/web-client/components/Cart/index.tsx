/* eslint-disable no-console */
export interface Item {
  id: string;
  description: string;
  quantity: number;
  singlePayment: number;
  installmentValue: number;
}

type AddItem = Item & {
  returnCart: boolean;
};

type RemoveItem = {
  id?: string;
  index: number;
  returnCart: boolean;
};

export default class Cart {
  public PRODUCT_LIST: Array<Item>;

  public TOTAL: any;

  public maxInstallmentNoInterest?: number;

  public CREDIT_CARD_PAYMENT?: null | {
    installmentAmount: number;
    interestFree: number;
    quantity: number;
    totalAmount: number;
  };

  public installmentQty: number;

  constructor(products: any) {
    this.PRODUCT_LIST = products;
    this.TOTAL = this.getSubTotal();
    this.installmentQty = 0;
  }

  setMaxInstallmentNoInterest(maxInstallmentNoInterest: number) {
    this.maxInstallmentNoInterest = maxInstallmentNoInterest;
  }

  addItem({
    id,
    description,
    singlePayment,
    installmentValue,
    quantity = 1,
    returnCart = false,
  }: AddItem) {
    this.PRODUCT_LIST.push({
      id,
      description,
      singlePayment,
      installmentValue,
      quantity,
    });
    if (!returnCart) {
      return this.getSubTotal();
    }
    return this.getItems();
  }

  getItem(item: Item) {
    const { id, description, installmentValue, singlePayment, quantity } = item;
    return {
      id,
      description,
      amount:
        // @ts-ignore
        Cart.installmentQty && this.installmentQty > 1
          ? installmentValue
          : singlePayment,
      quantity,
    };
  }

  getItems(list = [] as Array<Item>) {
    if (!list.length) {
      return this.PRODUCT_LIST.map(this.getItem);
    }
    return list.map((_item, index) => this.getItem(this.PRODUCT_LIST[index]));
  }

  removeItem({ id, index, returnCart = false }: RemoveItem) {
    let item;
    if (id) {
      item = this.PRODUCT_LIST.reduce(
        (i: number | null, { id: itemId }, itemIndex) => {
          if (itemId === id) return itemIndex;
          return i;
        },
        null
      );
    } else {
      item = index;
    }

    if (typeof item !== 'number') {
      return returnCart ? this.PRODUCT_LIST : undefined;
    }

    if (this.PRODUCT_LIST.length < item - 1) {
      return console.error('Index not found');
    }
    this.PRODUCT_LIST = this.PRODUCT_LIST.splice(item, 1);
    if (!returnCart) {
      return this.getSubTotal();
    }
    return this.PRODUCT_LIST;
  }

  setCreditCardPayment({
    installmentAmount,
    interestFree,
    quantity,
    totalAmount,
  }: {
    installmentAmount: number;
    interestFree: number;
    quantity: number;
    totalAmount: number;
  }) {
    this.CREDIT_CARD_PAYMENT = {
      installmentAmount,
      interestFree,
      quantity,
      totalAmount,
    };
    return this.CREDIT_CARD_PAYMENT.totalAmount;
  }

  setBankTicketPayment() {
    this.CREDIT_CARD_PAYMENT = null;
  }

  getSubTotal() {
    this.TOTAL = this.getItems().reduce(
      (total, { quantity, amount }) => total + quantity * amount,
      0
    );
    return this.TOTAL;
  }

  getTotal() {
    if (this.CREDIT_CARD_PAYMENT) {
      return this.CREDIT_CARD_PAYMENT.totalAmount;
    }
    return this.getSubTotal();
  }

  getData() {
    return {
      items: this.getItems(),
      creditCard: this.CREDIT_CARD_PAYMENT,
      total: this.getTotal(),
      maxInstallmentNoInterest: this.maxInstallmentNoInterest,
    };
  }
}
