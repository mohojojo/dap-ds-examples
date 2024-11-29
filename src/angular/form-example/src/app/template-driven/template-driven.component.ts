import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DapDSInputValueAccessorDirective } from '../my-input/dap-ds-input.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  imports: [DapDSInputValueAccessorDirective, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './template-driven.component.html',
  styleUrl: './template-driven.component.scss'
})
export class TemplateDrivenComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
  };

  onSubmit() {
    console.log('Form Data:', this.formData);
  }
}
