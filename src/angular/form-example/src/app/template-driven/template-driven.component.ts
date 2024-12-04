import { Component } from '@angular/core'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { DapDSInputValueAccessorDirective } from '../directives/dap-ds-input.directive'
import { FormsModule } from '@angular/forms'
import { DapDSCheckboxValueAccessorDirective } from '../directives/dap-ds-checkbox.directive'
import { DapDSDatePickerValueAccessorDirective } from '../directives/dap-ds-datepicker.directive'
import { DapDSTextareaValueAccessorDirective } from '../directives/dap-ds-textarea.directive'
import { DapDSSelectValueAccessorDirective } from '../directives/dap-ds-select.directive'

@Component({
  selector: 'app-template-driven',
  imports: [
    DapDSInputValueAccessorDirective,
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

  formData = {
    fullName: '',
    title: '',
    email: '',
    birthDate: '',
    subject: '',
    message: '',
    tnc: false,
  }

  onSubmit() {
    console.log('Form Data:', this.formData)
    this.submitted = true
  }
}
