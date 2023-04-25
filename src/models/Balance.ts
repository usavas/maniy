export default class Balance {
  Platform: string;
  Capital: number;
  Currency: string;

  public constructor(platform: string, capital: number, currency: string) {
    this.Platform = platform;
    this.Capital = capital;
    this.Currency = currency;
  }
}
