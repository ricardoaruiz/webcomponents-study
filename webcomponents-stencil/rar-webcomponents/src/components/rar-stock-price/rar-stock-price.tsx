import { Component, h, State, Watch, Prop, Listen } from '@stencil/core';

import { StockData } from './types';
import { getStockData } from './service';

@Component({
  tag: 'rar-stock-price',
  styleUrl: 'rar-stock-price.css',
  shadow: true,
})
export class RarStockPrice {

  @Prop({ reflect: true, mutable: true, attribute: 'symbol' })
  stockSymbolProp: string

  @State()
  stockSymbolInput: string

  @State()
  hasStockSymbolInput: boolean

  @State()
  isLoadingData = false

  @State()
  data: StockData | null

  @State()
  error: string | null = null

  @Watch('stockSymbolProp')
  onSymbolPropChange(newValue: string, oldValue: string) {

    if (newValue === oldValue) return

    this.stockSymbolInput = newValue
    this.fetchData(newValue)
  }

  @Watch('stockSymbolInput')
  onStockSymbolInputChange(newValue: string, oldValue: string) {

    if (newValue === oldValue) return

    this.hasStockSymbolInput = !!newValue

    if (!this.hasStockSymbolInput) {
      this.data = null
    }
  }

  @Listen('symbolSelected', {
    target: 'body'
  })
  onStockSelectedHandler(event: CustomEvent<string>) {
    this.stockSymbolProp = event.detail
  }

  async onSubmitForm(event: Event) {
    event.preventDefault()
    if (!this.stockSymbolInput) return
    this.fetchData(this.stockSymbolInput)
  }

  onStockSymbolInput(event: Event) {
    this.stockSymbolInput = (event.target as HTMLInputElement).value
  }

  async fetchData(symbol: string) {
    try {
      this.error = null
      this.isLoadingData = true
      const stockData = await getStockData(symbol)
      this.data = stockData
    } catch(error) {
      this.error = error.message
      this.data = null
    } finally {
      this.isLoadingData = false
    }
  }

  componentWillLoad() {
    if(this.stockSymbolProp) {
      this.stockSymbolInput = this.stockSymbolProp
      return this.fetchData(this.stockSymbolProp)
    }
  }

  hostData() {
    return {
      class: this.error && 'error'
    }
  }

  renderResult() {
    if (this.isLoadingData) {
      return <rar-spinner />
    }
    if (!this.hasStockSymbolInput && !this.data) {
      return <p>No symbol have been entered</p>
    }
    if (this.hasStockSymbolInput && !this.error) {
      return <p>Price: {this.data && this.data.price}</p>
    }
    if (this.error) {
      return <p>{this.error}</p>
    }
  }

  render() {
    return [
      <h1>Stock Price</h1>,
      <form onSubmit={this.onSubmitForm.bind(this)}>

        <div class="form-fields">
          <input
            id="stock-symbol"
            value={this.stockSymbolInput}
            placeholder="Enter the symbol here"
            autoComplete='off'
            onInput={this.onStockSymbolInput.bind(this)}
          />
          <rar-tooltip text="Enter a symbol in the field and press the button to recevie then information. Example: IBM, MSFT, AAPL" />
        </div>

        <button type="submit" disabled={!this.hasStockSymbolInput || this.isLoadingData}>
          {this.isLoadingData ? 'Loading...' : 'Fetch'}
        </button>
      </form>,

      <div>
        {this.renderResult()}
      </div>
    ];
  }

}
