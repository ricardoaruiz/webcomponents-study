import { Component, h } from '@stencil/core';

@Component({
  tag: 'rar-spinner',
  styleUrl: 'rar-spinner.css',
  shadow: true,
})
export class RarSpinner {

  render() {
    return (
      <div class="loader"></div>
    );
  }

}
