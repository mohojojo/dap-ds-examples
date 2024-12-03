import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DapDSInputValueAccessorDirective } from '../directives/dap-ds-input.directive';
import { DapDSCheckboxValueAccessorDirective } from '../directives/dap-ds-checkbox.directive';
import { DapDSDatePickerValueAccessorDirective } from '../directives/dap-ds-datepicker.directive';
import { DapDSTextareaValueAccessorDirective } from '../directives/dap-ds-textarea.directive'
import { DapDSSelectValueAccessorDirective } from '../directives/dap-ds-select.directive';
import { DapDSComboboxAccessorDirective } from '../directives/dap-ds-combobox.directive';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-reactive',
  imports: [
    ReactiveFormsModule,
    DapDSInputValueAccessorDirective,
    DapDSCheckboxValueAccessorDirective,
    DapDSDatePickerValueAccessorDirective,
    DapDSTextareaValueAccessorDirective,
    DapDSSelectValueAccessorDirective,
    DapDSComboboxAccessorDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.scss'
})
export class ReactiveComponent {
  isFormSubmitted = false
  myForm: FormGroup;
  products: Product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.myForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      product: ['', Validators.required],
      subject: [''],
      message: ['', Validators.required],
      tnc: [false, Validators.requiredTrue],
    });
  }

  getProducts(productFilter: string): void {
    if (productFilter) {
      this.productService.getProducts(productFilter).subscribe(searchResult => {
        if (searchResult?.products) {
          this.products = searchResult?.products;
        }
      });
    }
  }

  validateRequire(formControlName: string, requireMessage: string): string {
    if (this.isFormSubmitted && formControlName && requireMessage) {
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

  getProductValidation(): string {
    return this.validateRequire('product', 'Válassz egy terméket!');
  }

  getTitleValidation(): string {
    return this.validateRequire('title', 'Válassz megnevezést!');
  }

  getBirthDateValidation(): string {
    return this.validateRequire('birthDate', 'Add meg a születési dátumod!');
  }

  getMessageValidation(): string {
    return this.validateRequire('message', 'Írd be az üzeneted!');
  }

  getTncValidation(): string {
    return this.validateRequire('tnc', 'Fogadd el az Adatkezelési tájékoztatót!');
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (window.showDapSnackbar) {
        window.showDapSnackbar('Gratulálunk! Minden mező helyes!', {
          duration: 4500,
          alertType: 'successful',
          actions: [
            { href: 'https://sg.hu', text: 'SG' },
            { href: 'https://index.hu', text: 'Index' },
          ],
        });
      }
      console.log(this.myForm.value);
    }
    this.isFormSubmitted = true;
  }
}
