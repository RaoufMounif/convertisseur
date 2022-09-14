export class ConversionEntity {
  public entryAmount: number;
  public entryAmountCurrency: string;

  public convertedAmount: number;
  public convertedAmountCurrency: string;
  public conversionTaux: number;
  public customConverisonTaux: number;

  constructor() {
    this.entryAmount = 0;
    this.entryAmountCurrency = '€';

    this.convertedAmount = 0;
    this.convertedAmountCurrency = '$';
    this.conversionTaux = 0;
    this.customConverisonTaux = 0;
  }
}
