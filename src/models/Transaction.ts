export default class Transaction {
  account: string;
  type: string;
  amount: number;
  currency: string;
  description: string;

  private constructor(
    account: string,
    type: string,
    amount: number,
    currency: string,
    description: string
  ) {
    this.account = account;
    this.type = type;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
  }

  public static createIncome(
    account: string,
    amount: number,
    currency: string,
    description: string = ""
  ) {
    return new Transaction(account, "in", amount, currency, description);
  }

  public static createExpense(
    account: string,
    amount: number,
    currency: string,
    description: string = ""
  ) {
    return new Transaction(account, "out", amount, currency, description);
  }
}
