import { EventEmitter } from '../../stencil-public-runtime';
export declare class SideDrawer {
  drawerRef: HTMLElement;
  private activeTab;
  title: string;
  opened: boolean;
  onOpenChange(): void;
  closeDrawer: EventEmitter<void>;
  private handleClose;
  private handleChangeActiveTab;
  private getActiveClass;
  private onDrwawerKeyDown;
  render(): any[];
}
