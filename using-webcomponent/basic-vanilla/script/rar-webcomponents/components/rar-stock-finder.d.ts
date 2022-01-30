import type { Components, JSX } from "../types/components";

interface RarStockFinder extends Components.RarStockFinder, HTMLElement {}
export const RarStockFinder: {
  prototype: RarStockFinder;
  new (): RarStockFinder;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
