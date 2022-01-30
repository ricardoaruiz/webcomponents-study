import { HTMLElement, h, proxyCustomElement } from '@stencil/core/internal/client';

const rarSpinnerCss = ":host{--_primary-color:#3b01b3;display:block}.loader{width:34px;height:34px;margin:0 auto;border:3px solid transparent;border-top:3px solid var(--primary-color, var(--_primary-color));border-radius:50%;animation:rotate 0.4s infinite linear}@keyframes rotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}";

let RarSpinner = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h("div", { class: "loader" }));
  }
  static get style() { return rarSpinnerCss; }
};
RarSpinner = /*@__PURE__*/ proxyCustomElement(RarSpinner, [1, "rar-spinner"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["rar-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "rar-spinner":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RarSpinner);
      }
      break;
  } });
}

export { RarSpinner as R, defineCustomElement as d };
