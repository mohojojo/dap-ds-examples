import { Component, ViewChild } from '@angular/core'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { DapDSInputValueAccessorDirective } from '../directives/dap-ds-input.directive'
import { FormsModule, NgForm, NgModel } from '@angular/forms'
import { DapDSCheckboxValueAccessorDirective } from '../directives/dap-ds-checkbox.directive'
import { DapDSDatePickerValueAccessorDirective } from '../directives/dap-ds-datepicker.directive'
import { DapDSTextareaValueAccessorDirective } from '../directives/dap-ds-textarea.directive'
import { DapDSSelectValueAccessorDirective } from '../directives/dap-ds-select.directive'
import { Product } from '../model/product'
import { debounceTime, Subject } from 'rxjs'
import { ProductService } from '../service/product.service'
import { DapDSComboboxAccessorDirective } from '../directives/dap-ds-combobox.directive'

@Component({
  selector: 'app-template-driven',
  imports: [
    DapDSInputValueAccessorDirective,
    DapDSComboboxAccessorDirective,
    DapDSCheckboxValueAccessorDirective,
    DapDSDatePickerValueAccessorDirective,
    DapDSTextareaValueAccessorDirective,
    DapDSSelectValueAccessorDirective,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './template-driven.component.html',
  styleUrl: './template-driven.component.scss',
})
export class TemplateDrivenComponent {
  submitted = false
  products: Product[] = [];

  @ViewChild('form') form!: NgForm;

  formData = {
    fullName: '',
    title: '',
    email: '',
    birthDate: '',
    product: '',
    subject: '',
    message: '',
    tnc: false,
  }

  @ViewChild('productModel') productModel!: NgModel;

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    this.productModel.valueChanges?.pipe(
      debounceTime(300)
    ).subscribe((value: string) => {
      console.log('Value changed:', value);
      if (value) {
        this.getProducts(value);
      }
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

  onSubmit() {
    console.log('Form Data:', this.formData)
    this.submitted = true
    if (this.form.valid) {
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
      console.log(this.form.value);
    }
  }
}
