import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-learning-app';
  color = '';
  location = 'US';
  userInput ='';
  form = new FormGroup({
    userInput_form: new FormControl()
  });

  get userInput_form(): any {
    return this.form.get('userInput_form');
  }
}
