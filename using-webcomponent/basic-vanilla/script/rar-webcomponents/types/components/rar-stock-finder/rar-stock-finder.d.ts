import { EventEmitter } from '../../stencil-public-runtime';
import { Symbol } from './types';
export declare class RarStockFinder {
  searchSymbol: string;
  hasSearchSymbol: boolean;
  data: Symbol[];
  isLoadingData: boolean;
  error: string | null;
  onSearchSymbleChange(newValue: string, oldValue: string): void;
  symbolSelected: EventEmitter<string>;
  onFindStocks(event: Event): Promise<void>;
  handleSearchSymbolChange(event: Event): void;
  handleSymbolSelected(symbol: string): void;
  renderResult(): any;
  render(): any;
}
