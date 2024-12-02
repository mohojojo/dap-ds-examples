import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Directive({
  selector: 'dap-ds-input[formControlName], dap-ds-input[formControl], dap-ds-input[ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DapDSInputValueAccessorDirective),
      multi: true,
    },
  ],
})
export class DapDSInputValueAccessorDirective implements ControlValueAccessor {
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Write a value to the custom element
  writeValue(value: any): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }

  // Register a callback for changes
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  // Register a callback for touch events
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Handle the input event
  @HostListener('dds-change', ['$event.target.value'])
  handleInput(value: any): void {
    this.onChange(value);
  }

  // Handle blur event
  @HostListener('blur')
  handleBlur(): void {
    this.onTouched();
  }
}
