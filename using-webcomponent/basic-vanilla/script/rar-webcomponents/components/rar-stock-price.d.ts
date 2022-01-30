import type { Components, JSX } from "../types/components";

interface RarStockPrice extends Components.RarStockPrice, HTMLElement {}
export const RarStockPrice: {
  prototype: RarStockPrice;
  new (): RarStockPrice;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
