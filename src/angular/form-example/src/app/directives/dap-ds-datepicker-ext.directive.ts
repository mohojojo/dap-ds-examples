import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[datepickerExtAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DapDSDatePickerExtValueAccDirective),
      multi: true
    }
  ]
})
export class DapDSDatePickerExtValueAccDirective implements ControlValueAccessor, OnInit {
  @Input() formControlName: string | undefined;
  @Output() ddsChange = new EventEmitter<Date>();

  private datepickerElement: HTMLElement | null = null;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.datepickerElement = this.el.nativeElement.querySelector('dap-ds-datepicker');
    this.listenToLitEvents();
  }

  // Listen for events from the Lit datepicker component
  private listenToLitEvents() {
    if (this.datepickerElement) {
      this.datepickerElement.addEventListener('dds-change', (e: any) => {
        this.onChange(e.detail);
        this.ddsChange.emit(e.detail);
      });
    }
  }

  // Handle the change event from the Lit datepicker component
  @HostListener('change', ['$event.target.value'])
  onChangeFromHost(value: string) {
      this.onChange(value);
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (this.datepickerElement && value) {
      this.datepickerElement.setAttribute('value', value.toISOString());
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.datepickerElement) {
      this.datepickerElement.toggleAttribute('disabled', isDisabled);
    }
  }
}
