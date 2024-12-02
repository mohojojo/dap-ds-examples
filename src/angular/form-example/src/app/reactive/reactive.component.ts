import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DapDSInputValueAccessorDirective } from '../directives/dap-ds-input.directive';
import { DapDSCheckboxValueAccessorDirective } from '../directives/dap-ds-checkbox.directive';
import { DapDSDatePickerValueAccessorDirective } from '../directives/dap-ds-datepicker.directive';
import { DapDSTextareaValueAccessorDirective } from '../directives/dap-ds-textarea.directive'
import { DapDSSelectValueAccessorDirective } from '../directives/dap-ds-select.directive';

@Component({
  selector: 'app-reactive',
  imports: [
    ReactiveFormsModule,
    DapDSInputValueAccessorDirective,
    DapDSCheckboxValueAccessorDirective,
    DapDSDatePickerValueAccessorDirective,
    DapDSTextareaValueAccessorDirective,
    DapDSSelectValueAccessorDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.scss'
})
export class ReactiveComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      product: ['', Validators.required],
      subject: [''],
      message: ['', Validators.required],
      tnc: [false, Validators.required],
    });
  }

  // getProducts(productFilter: string): void {
  //   if (productFilter) {
  //     this.productService.getProducts(productFilter).subscribe(data => {
  //       this.myData = data;
  //     });
  //   }
  // }

  validateRequire(formControlName: string, requireMessage: string): string {
    if (formControlName && requireMessage) {
      const control = this.myForm.get(formControlName);
      if (control?.hasError('required')) {
        return requireMessage;
      }
    }
    return '';
  }

  getFullNameValidation(): string {
    return this.validateRequire('fullName', 'Add meg a teljes neved!');
  }

  getEmailValidation(): string {
    return this.validateRequire('email', 'Add meg az e-mail címed!');
  }

  getTitleValidation(): string {
    return this.validateRequire('title', 'Válassz megnevezést!');
  }

  getBirthDateValidation(): string {
    return this.validateRequire('birthDate', 'Add meg a születési dátumod!');
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
  }
}
