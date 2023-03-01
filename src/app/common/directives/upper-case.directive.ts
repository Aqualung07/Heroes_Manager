import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * This class is for setting the text of an input to Upper Case.
 * It sets the selection range every time the input changes, to prevent the cursor from going to last value.
 * @class {UpperCaseDirective}
 */
@Directive({
  selector: '[appUpperCase]',
})
export class UpperCaseDirective {
  constructor(public ref: ElementRef) {}

  @HostListener('input', ['$event']) onInput($event: any) {
    var start = $event.target.selectionStart;
    var end = $event.target.selectionEnd;

    $event.target.value = $event.target.value.toUpperCase();
    $event.target.setSelectionRange(start, end);
    $event.preventDefault();
  }
}
