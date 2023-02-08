import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputformat]'
})
export class InputformatDirective {
  @Input() appInputformat: any = '';
  @Input() locationinfo = '';
 constructor(private el: ElementRef) {
 }

 @HostListener('focusin') onMouseEnter() {
    this.el.nativeElement.style.color = '';
}

@HostListener('focusout') onMouseLeave() {
  typeof this.appInputformat === "string"
  ? this.el.nativeElement.value = this.inputformater(this.appInputformat , this.locationinfo)
  : this.inputformater_bind(this.appInputformat , this.locationinfo);//this.el.nativeElement.value
}

public inputformater(input: string, location: string): string{
  let tempValue = input;
  let decimalSplitter = '.';
  let thousendSplitter = ',';
  let maxDecimalPosition = 3;
  let decimalSplitterCount = 0;
  let thousendSplitterCount = 0;
  let decimalIndex = 0;
  let thousendIndex = 0;
  switch (location) {
    case 'UK':
      decimalSplitter = ',';
      thousendSplitter = '.';
      break;
    case 'US':
    default:
      decimalSplitter = '.';
      thousendSplitter = ',';
      break;
  }
  tempValue = tempValue.replaceAll(',', '').replaceAll('.', '');
  if(Number.isNaN(Number(tempValue))) {
    console.log(tempValue);
    console.log('Error1');
    this.el.nativeElement.style.color = 'red';
    return tempValue;
  }

  let position = 0;
  let position1 = 0;
  var bindValue ='';
  for (var x = input.length - 1; x >= 0; x--) {
    let letter = input[x];
    position++;

    if (letter === decimalSplitter) {
      decimalSplitterCount++;
      decimalIndex = position;
      position1 = position;
      if (decimalSplitterCount > 1 || decimalIndex > maxDecimalPosition) {
        console.log('Error');
        this.el.nativeElement.style.color = 'red';
        return input;
      }
    }

    if (letter === thousendSplitter) {
      thousendSplitterCount++;
      thousendIndex = position;
      if(thousendIndex !== thousendSplitterCount*4 + decimalIndex) {
        console.log('Error');
        this.el.nativeElement.style.color = 'red';
        return input;
      }
    }
  }
  // Binding value
  var initialvalue = input.replaceAll(thousendSplitter, '');
  if(decimalIndex)
  {
      bindValue = initialvalue.slice(initialvalue.length-decimalIndex, initialvalue.length);
      if(bindValue.replaceAll('0','').length === 1){
        bindValue = '';
      }
      if(location ==='UK'){
        bindValue = bindValue.replaceAll(decimalSplitter,'.')
      }
  }

  let thousendPosition = 1;
  let index = 0;
  for (var x = initialvalue.length-decimalIndex - 1; x >= 0; x--) {
    index++;
    let letter = initialvalue[x];

    bindValue = letter + bindValue;
    if(thousendPosition*3 === index && initialvalue.length !== index){
      bindValue ="," + bindValue;
      thousendPosition++;
    }
  }
  this.el.nativeElement.style.color = 'Green';
  return bindValue;
}
public inputformater_bind(formValue: any, location: string): void {
  let input = formValue.value;

  let tempValue = input;
  let decimalSplitter = '.';
  let thousendSplitter = ',';
  let maxDecimalPosition = 3;
  let decimalSplitterCount = 0;
  let thousendSplitterCount = 0;
  let decimalIndex = 0;
  let thousendIndex = 0;
  switch (location) {
    case 'UK':
      decimalSplitter = ',';
      thousendSplitter = '.';
      break;
    case 'US':
    default:
      decimalSplitter = '.';
      thousendSplitter = ',';
      break;
  }
  tempValue = tempValue.replaceAll(',', '').replaceAll('.', '');
  if(Number.isNaN(Number(tempValue))) {
    console.log(tempValue);
    console.log('Error1');
    this.el.nativeElement.style.color = 'red';
    this.appInputformat.status = "INVALID";
    this.appInputformat.value = '';
    return;
  }

  let position = 0;
  let position1 = 0;
  var bindValue ='';
  for (var x = input.length - 1; x >= 0; x--) {
    let letter = input[x];
    position++;

    if (letter === decimalSplitter) {
      decimalSplitterCount++;
      decimalIndex = position;
      position1 = position;
      if (decimalSplitterCount > 1 || decimalIndex > maxDecimalPosition) {
        console.log('Error');
        this.el.nativeElement.style.color = 'red';
        this.appInputformat.status = "INVALID";
        this.appInputformat.value = '';
        return;
      }
    }

    if (letter === thousendSplitter) {
      thousendSplitterCount++;
      thousendIndex = position;
      if(thousendIndex !== thousendSplitterCount*4 + decimalIndex) {
        console.log('Error');
        this.el.nativeElement.style.color = 'red';
        this.appInputformat.status = "INVALID";
        this.appInputformat.value = '';
        return;
      }
    }
  }
  // Binding value
  var initialvalue = input.replaceAll(thousendSplitter, '');
  if(decimalIndex)
  {
      bindValue = initialvalue.slice(initialvalue.length-decimalIndex, initialvalue.length);
      if(bindValue.replaceAll('0','').length === 1){
        bindValue = '';
      }
      if(location ==='UK'){
        bindValue = bindValue.replaceAll(decimalSplitter,'.')
      }
  }

  let thousendPosition = 1;
  let index = 0;
  for (var x = initialvalue.length-decimalIndex - 1; x >= 0; x--) {
    index++;
    let letter = initialvalue[x];

    bindValue = letter + bindValue;
    if(thousendPosition*3 === index && initialvalue.length !== index){
      bindValue ="," + bindValue;
      thousendPosition++;
    }
  }
  this.el.nativeElement.style.color = 'Green';
  this.appInputformat.status = "VALID";
  this.el.nativeElement.value = this.appInputformat.value = bindValue;
  return;
}
}
