import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FocusWithinModule } from './focus-within/focus-within.module';

@NgModule({
  imports: [BrowserModule, FormsModule, FocusWithinModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
