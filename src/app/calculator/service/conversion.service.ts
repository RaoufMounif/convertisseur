import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { range } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ConverionsSerice {
  public convert(entryAmount: number, conversionTaux: number): number {
    let targetAmount: number = entryAmount * conversionTaux;
    return targetAmount;
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
