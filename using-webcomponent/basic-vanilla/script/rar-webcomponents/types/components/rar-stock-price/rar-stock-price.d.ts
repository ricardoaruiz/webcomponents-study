import { StockData } from './types';
export declare class RarStockPrice {
  stockSymbolProp: string;
  stockSymbolInput: string;
  hasStockSymbolInput: boolean;
  isLoadingData: boolean;
  data: StockData | null;
  error: string | null;
  onSymbolPropChange(newValue: string, oldValue: string): void;
  onStockSymbolInputChange(newValue: string, oldValue: string): void;
  onStockSelectedHandler(event: CustomEvent<string>): void;
  onSubmitForm(event: Event): Promise<void>;
  onStockSymbolInput(event: Event): void;
  fetchData(symbol: string): Promise<void>;
  componentWillLoad(): Promise<void>;
  hostData(): {
    class: string;
  };
  renderResult(): any;
  render(): any[];
}
