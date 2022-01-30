import type { Components, JSX } from "../types/components";

interface RarSideDrawer extends Components.RarSideDrawer, HTMLElement {}
export const RarSideDrawer: {
  prototype: RarSideDrawer;
  new (): RarSideDrawer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
