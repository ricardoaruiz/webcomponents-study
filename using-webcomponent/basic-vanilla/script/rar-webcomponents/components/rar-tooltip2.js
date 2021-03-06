import { HTMLElement, h, Host, proxyCustomElement } from '@stencil/core/internal/client';

const rarTooltipCss = ":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}:host{display:inline}:host([opened]) .tootlip_backdrop{display:block;pointer-events:all}:host([opened]) .tootlip_text{visibility:visible;opacity:1}.tootlip_backdrop{position:fixed;top:0;left:0;right:0;bottom:0;background-color:transparent;z-index:var(--_layer-backdrop);display:none;pointer-events:none}.tooltip_icon{position:relative;display:inline-flex;justify-content:center;align-items:center;width:1.2rem;height:1.2rem;border-radius:50%;background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_primary-color-inverse));cursor:pointer}.tootlip_text{position:absolute;background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_primary-color-inverse));top:1.8rem;border-radius:4px;padding:0.5rem;font-size:0.9rem;line-height:1.4;width:max-content;max-width:200px;z-index:var(--_layer-base);outline:none;visibility:hidden;opacity:0;transition:all 0.4s ease-out}.tootlip_text::before{content:'';position:absolute;display:block;width:0px;left:50%;top:0.3rem;border:8px solid transparent;border-top:0;border-bottom:8px solid var(--primary-color, var(--_primary-color));transform:translate(-50%, calc(-100% - 5px))}";

let RarTooltip = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.opened = false;
  }
  onOpen() {
    this.opened = true;
    this.tooltipIconRef.focus();
  }
  onClose(event) {
    event === null || event === void 0 ? void 0 : event.stopPropagation();
    this.opened = false;
  }
  onTooltipTextKeyDown(event) {
    event.key === 'Escape' && this.onClose();
  }
  render() {
    return (h(Host, null, h("div", { tabIndex: 0, class: 'tootlip_backdrop', onClick: this.onClose.bind(this) }), h("slot", null), h("span", { tabIndex: 1, class: "tooltip_icon", onClick: this.onOpen.bind(this), onKeyDown: this.onTooltipTextKeyDown.bind(this), ref: (el) => this.tooltipIconRef = el }, "?", h("div", { tabIndex: 1, class: 'tootlip_text', "aria-label": this.text, onClick: this.onClose.bind(this) }, this.text))));
  }
  static get style() { return rarTooltipCss; }
};
RarTooltip = /*@__PURE__*/ proxyCustomElement(RarTooltip, [1, "rar-tooltip", {
    "opened": [1540],
    "text": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["rar-tooltip"];
  components.forEach(tagName => { switch (tagName) {
    case "rar-tooltip":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RarTooltip);
      }
      break;
  } });
}

export { RarTooltip as R, defineCustomElement as d };
