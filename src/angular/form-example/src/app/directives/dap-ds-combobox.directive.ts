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
  selector: 'dap-ds-combobox[formControlName], dap-ds-combobox[formControl], dap-ds-combobox[ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DapDSComboboxAccessorDirective),
      multi: true,
    },
  ],
})
export class DapDSComboboxAccessorDirective implements ControlValueAccessor {
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

  @HostListener('dds-input', ['$event.detail.input'])
  handleInput(value: any): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
    this.onChange(value);
  }

  @HostListener('blur')
  handleBlur(): void {
    this.onTouched();
  }
}
