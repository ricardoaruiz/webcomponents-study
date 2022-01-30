import { Component, Host, h, State, Watch, EventEmitter, Event } from '@stencil/core';

import { getSymbols } from './service';
import { Symbol } from './types'

@Component({
  tag: 'rar-stock-finder',
  styleUrl: 'rar-stock-finder.css',
  shadow: true,
})
export class RarStockFinder {


  @State()
  searchSymbol: string

  @State()
  hasSearchSymbol: boolean = false

  @State()
  data: Symbol[]

  @State()
  isLoadingData: boolean = false

  @State()
  error: string | null = null

  @Watch('searchSymbol')
  onSearchSymbleChange(newValue: string, oldValue: string) {
    if (newValue === oldValue) return

    this.hasSearchSymbol = !!newValue

    if (!this.hasSearchSymbol) {
      this.data = []
      this.error = null
    }
  }

  @Event({
    bubbles: true,
    composed: true
  })
  symbolSelected: EventEmitter<string>

  async onFindStocks(event: Event) {
    try {
      event.preventDefault()

      this.error = null
      this.isLoadingData = true
      this.data = (await getSymbols(this.searchSymbol)).data
    } catch(error) {
      this.error = error.message
    } finally {
      this.isLoadingData = false
    }
  }

  handleSearchSymbolChange(event: Event) {
    this.searchSymbol = (event.target as HTMLInputElement).value
  }

  handleSymbolSelected(symbol: string) {
    this.symbolSelected.emit(symbol)
  }

  renderResult() {

    if (this.isLoadingData) {
      return <rar-spinner />
    }

    if (this.error) {
      return (<p>{this.error}</p>)
    }

    if (!this.error && !this.data?.length) {
      return (<p>No symbols to list</p>)
    }

    return (
      <div>
        <h2>Results found</h2>
        <ul>
          {
            this.data.map(item => (
              <li
                key={item.symbol}
                onClick={this.handleSymbolSelected.bind(this, item.symbol)}
              >
                <strong>{item.symbol}</strong> / <small>{item.name}</small>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

  render() {
    return (
      <Host>
        <h1>Symbol Finder</h1>
        <form onSubmit={this.onFindStocks.bind(this)}>
          <div class="form-fields">
            <input
              id="stock-symbol"
              placeholder="Enter the symbol here"
              autoComplete='off'
              value={this.searchSymbol}
              onInput={this.handleSearchSymbolChange.bind(this)}
            />
          </div>

          <button type="submit" disabled={!this.hasSearchSymbol || this.isLoadingData}>
            {this.isLoadingData ? 'Loading...' : 'Find'}
          </button>

        </form>

        {this.renderResult()}
      </Host>
    );
  }

}
