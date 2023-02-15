import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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

  ngOnInit(): void {
    this.form = new FormGroup({
      userInput_form: new FormControl(null, [Validators.required, Validators.minLength(2), this.userInputValidator()])
    })
  }

  get userInput_form(): any {
    return this.form.get('userInput_form');
  }

  userInputValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return !control.valid ? {'Not valid input': {value: null}} : control.value;
    };
  }
}
