import { Component, OnInit, ViewChild } from '@angular/core';
import { ConverionsSerice } from './service/conversion.service';
import { timer, interval } from 'rxjs';
import { ConversionEntity } from './ConversionEntity';
import { HistoryEntitiy } from './HistoryEntity';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  public conversionsHistory = new HistoryEntitiy();
  public conversion = new ConversionEntity();
  isFixTaux = false;
  displayedColumns: string[] = [
    'customConverisonTaux',
    'conversionTaux',
    'entryAmount',
    'convertedAmount',
  ];

  @ViewChild(MatTable)
  table!: MatTable<HistoryEntitiy>;
  dataSource = this.conversionsHistory.conversions;

  constructor(private conversionService: ConverionsSerice) {}

  ngOnInit(): void {
    this.conversion.conversionTaux = 1.1;
    this.conversion.entryAmount = 0;
    this.conversion.convertedAmount = 0;
    if (!this.isFixTaux) {
      interval(3000).subscribe(() => {
        if (!this.isFixTaux) {
          this.conversion.conversionTaux = this.updateTaux();
          this.convert(
            this.conversion.entryAmount,
            this.conversion.conversionTaux
          );
        }
      });
    }
  }
  convert(entryAmount: any, taux: any) {
    this.conversion.entryAmount = entryAmount;
    this.conversion.convertedAmount = this.conversionService.convert(
      entryAmount,
      taux
    );
    if (this.isFixTaux) {
      this.conversion.customConverisonTaux = taux;
    }
    let history: ConversionEntity = new ConversionEntity();
    history.conversionTaux = this.conversion.conversionTaux;
    history.customConverisonTaux = this.conversion.customConverisonTaux;
    history.entryAmount = this.conversion.entryAmount;
    history.entryAmountCurrency = this.conversion.entryAmountCurrency;
    history.convertedAmount = this.conversion.convertedAmount;
    history.convertedAmountCurrency = this.conversion.convertedAmountCurrency;

    this.storHistory(history);
  }
  switchCurrency(entryAmount: any, taux: any) {
    if (this.conversion.entryAmountCurrency === '€') {
      this.conversion.entryAmountCurrency = '$';
      this.conversion.convertedAmountCurrency = '€';
    } else {
      this.conversion.entryAmountCurrency = '€';
      this.conversion.convertedAmountCurrency = '$';
    }
    this.conversion.entryAmount = this.conversion.convertedAmount;
    this.conversion.conversionTaux = 1 / this.conversion.conversionTaux;
    this.convert(this.conversion.entryAmount, taux);
  }
  updateTaux() {
    let randomChange =
      this.conversionService.getRandomArbitrary(-50, 50) / 1000;

    return this.conversion.conversionTaux + randomChange;
  }

  storHistory(conversion: ConversionEntity) {
    //this.conversionsHistory.conversions.push(conversion);
    this.dataSource.push(conversion);
  }
  showHistory() {
    this.table.renderRows();
  }
}
