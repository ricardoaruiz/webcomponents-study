export declare class RarTooltip {
  tooltipIconRef: HTMLElement;
  opened: boolean;
  text: string;
  onOpen(): void;
  onClose(event?: MouseEvent): void;
  onTooltipTextKeyDown(event: KeyboardEvent): void;
  render(): any;
}
