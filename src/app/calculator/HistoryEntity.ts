import { ConversionEntity } from './ConversionEntity';

export class HistoryEntitiy {
  public conversions: ConversionEntity[];

  constructor() {
    this.conversions = [];
  }
}
