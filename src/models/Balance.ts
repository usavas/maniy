export default class Balance {
  Account: string;
  Currency: string;
  Amount: number;

  public constructor(account: string, currency: string, amount: number) {
    this.Account = account;
    this.Amount = amount;
    this.Currency = currency;
  }
}
