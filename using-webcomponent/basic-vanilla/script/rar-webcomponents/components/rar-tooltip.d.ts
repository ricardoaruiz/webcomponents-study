import type { Components, JSX } from "../types/components";

interface RarTooltip extends Components.RarTooltip, HTMLElement {}
export const RarTooltip: {
  prototype: RarTooltip;
  new (): RarTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
