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
  selector: 'dap-ds-datepicker[formControlName], dap-ds-datepicker[formControl], dap-ds-datepicker[ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DapDSDatePickerValueAccessorDirective),
      multi: true,
    },
  ],
})
export class DapDSDatePickerValueAccessorDirective implements ControlValueAccessor {
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  writeValue(value: any): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('dds-change', ['$event.target.value'])
  handleInput(value: any): void {
    this.onChange(value);
  }

  @HostListener('blur')
  handleBlur(): void {
    this.onTouched();
  }
}
