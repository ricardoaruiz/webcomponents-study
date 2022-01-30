import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'rar-tooltip',
  styleUrl: 'rar-tooltip.css',
  shadow: true,
})
export class RarTooltip {

  tooltipIconRef: HTMLElement

  @Prop({ reflect: true, mutable: true })
  opened = false

  @Prop()
  text: string

  onOpen() {
    this.opened = true
    this.tooltipIconRef.focus()
  }

  onClose(event?: MouseEvent) {
    event?.stopPropagation()
    this.opened = false
  }

  onTooltipTextKeyDown(event: KeyboardEvent) {
    event.key === 'Escape' && this.onClose()
  }

  render() {
    return (
      <Host>
        <div
          tabIndex={0}
          class='tootlip_backdrop'
          onClick={this.onClose.bind(this)}
        />

        <slot></slot>

        <span
          tabIndex={1}
          class="tooltip_icon"
          onClick={this.onOpen.bind(this)}
          onKeyDown={this.onTooltipTextKeyDown.bind(this)}
          ref={(el) => this.tooltipIconRef = el as HTMLElement}
        >
          ?

          <div
            tabIndex={1}
            class='tootlip_text'
            aria-label={this.text}
            onClick={this.onClose.bind(this)}
          >
            {this.text}
          </div>
        </span>

      </Host>
    );
  }
}
