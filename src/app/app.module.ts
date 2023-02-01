import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectiveExampleComponentComponent } from './directive-example-component/directive-example-component.component';
import { InputformatDirective } from './inputformat.directive';

@NgModule({
  declarations: [
    AppComponent,
    DirectiveExampleComponentComponent,
    InputformatDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
