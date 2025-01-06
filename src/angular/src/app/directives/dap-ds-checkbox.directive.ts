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
  selector: 'dap-ds-checkbox[formControlName], dap-ds-checkbox[formControl], dap-ds-checkbox[ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DapDSCheckboxValueAccessorDirective),
      multi: true,
    },
  ],
})
export class DapDSCheckboxValueAccessorDirective implements ControlValueAccessor {
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

  @HostListener('dds-change', ['$event.detail.checked'])
  handleInput(value: any): void {
    this.onChange(value);
    console.log(`checkbox @HostListener('dds-change', ['$event.detail.checked'])`);
    console.log(value);
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }

  @HostListener('blur')
  handleBlur(): void {
    this.onTouched();
  }
}
