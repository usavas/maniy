export default class Transaction {
  account: string;
  type: string;
  amount: number;
  description: string;

  private constructor(
    account: string,
    type: string,
    amount: number,
    description: string
  ) {
    this.account = account;
    this.type = type;
    this.amount = amount;
    this.description = description;
  }

  public static createIncome(
    account: string,
    amount: number,
    description: string = ""
  ) {
    return new Transaction(account, "in", amount, description);
  }

  public static createExpense(
    account: string,
    amount: number,
    description: string = ""
  ) {
    return new Transaction(account, "out", amount, description);
  }
}
