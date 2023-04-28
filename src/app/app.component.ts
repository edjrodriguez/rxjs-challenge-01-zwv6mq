import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  focused = null;

  get name(): string {
    return this.focused ? this.focused.tagName : 'null';
  }

  onFocusWithin(focused: Element | null) {
    this.focused = focused;
  }
}
