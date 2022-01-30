import type { Components, JSX } from "../types/components";

interface RarSpinner extends Components.RarSpinner, HTMLElement {}
export const RarSpinner: {
  prototype: RarSpinner;
  new (): RarSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
