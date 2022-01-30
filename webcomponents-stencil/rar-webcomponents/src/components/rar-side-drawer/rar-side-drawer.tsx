import { Component, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';

const tabs = {
  navigation: 'navigation',
  contact: 'contact'
}

@Component({
  tag: 'rar-side-drawer',
  styleUrl: 'rar-side-drawer.css',
  shadow: true,
})
export class SideDrawer {

  drawerRef: HTMLElement

  @State()
  private activeTab = tabs.navigation

  @Prop({ reflect: true })
  title: string

  @Prop({ reflect: true })
  opened: boolean

  @Watch('opened')
  onOpenChange() {
    this.opened && this.drawerRef.focus()
  }

  @Event({
    bubbles: true,
    composed: true
  })
  closeDrawer: EventEmitter<void>

  private handleClose() {
    console.log('internal closing...')
    this.closeDrawer.emit()
  }

  private handleChangeActiveTab(activeTab: string) {
    this.activeTab = activeTab
  }

  private getActiveClass(activeTabe: string) {
    return this.activeTab === activeTabe ? 'active': ''
  }

  private onDrwawerKeyDown(event: KeyboardEvent) {
    event.key === 'Escape' && this.handleClose()
  }

  render() {
    return [
          <div
            class={`backdrop ${this.opened ? 'open' : ''}`}
            onClick={this.handleClose.bind(this)}
            tabindex="0"
          />,

          <aside
            class={this.opened ? 'open' : ''}
            ref={(el) => this.drawerRef = el as HTMLElement}
            onKeyDown={this.onDrwawerKeyDown.bind(this)}
            tabindex="1"
          >
            <header>
              <h1>{this.title}</h1>
              <button
                type="button"
                onClick={this.handleClose.bind(this)}
              >
                X
              </button>
            </header>

            <section class="tabs">
              <button
                class={this.getActiveClass(tabs.navigation)}
                onClick={this.handleChangeActiveTab.bind(this, tabs.navigation)}
              >
                Navigation
              </button>

              <button
                class={this.getActiveClass(tabs.contact)}
                onClick={this.handleChangeActiveTab.bind(this, tabs.contact)}
              >
                Contact
              </button>
            </section>

            <section class={`tab ${this.getActiveClass(tabs.navigation)}`}>
              <slot name={tabs.navigation}/>
            </section>

            <section class={`tab ${this.getActiveClass(tabs.contact)}`}>
              <slot name={tabs.contact} />
            </section>

          </aside>
      ]
  }

}
