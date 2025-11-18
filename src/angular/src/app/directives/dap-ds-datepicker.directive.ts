import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Directive({
  selector:
    'dap-ds-datepicker[formControlName], dap-ds-datepicker[formControl], dap-ds-datepicker[ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DapDSDatePickerValueAccessorDirective),
      multi: true,
    },
  ],
})
export class DapDSDatePickerValueAccessorDirective
  implements ControlValueAccessor, OnChanges, AfterViewInit
{
  private onChange = (value: any) => {}
  private onTouched = () => {}

  @Input() maxDate?: any
  @Input() minDate?: any
  @Input() disabledDate?: (date: any) => boolean

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Set initial values if they were provided
    if (this.maxDate !== undefined) {
      this.renderer.setProperty(this.el.nativeElement, 'maxDate', this.maxDate)
    }
    if (this.minDate !== undefined) {
      this.renderer.setProperty(this.el.nativeElement, 'minDate', this.minDate)
    }
    if (this.disabledDate !== undefined) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'disabledDate',
        this.disabledDate,
      )
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maxDate']) {
      this.renderer.setProperty(this.el.nativeElement, 'maxDate', this.maxDate)
    }
    if (changes['minDate']) {
      this.renderer.setProperty(this.el.nativeElement, 'minDate', this.minDate)
    }
    if (changes['disabledDate']) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'disabledDate',
        this.disabledDate,
      )
    }
  }

  writeValue(value: any): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', value)
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  @HostListener('dds-change', ['$event.target.value'])
  handleInput(value: any): void {
    this.onChange(value)
  }

  @HostListener('blur')
  handleBlur(): void {
    this.onTouched()
  }
}
