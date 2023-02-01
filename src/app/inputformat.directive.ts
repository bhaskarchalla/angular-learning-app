import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputformat]'
})
export class InputformatDirective {
  @Input() appInputformat = '';
  @Input() locationinfo = '';
 constructor(private el: ElementRef) {
 }

 @HostListener('focusin') onMouseEnter() {
    this.el.nativeElement.style.color = '';
}

@HostListener('focusout') onMouseLeave() {
  this.el.nativeElement.value =this.inputformater(this.appInputformat, this.locationinfo);
}

private inputformater(input: string, location: string): string{
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
  this.el.nativeElement.style.color = 'Green';
  return input;
}
}
