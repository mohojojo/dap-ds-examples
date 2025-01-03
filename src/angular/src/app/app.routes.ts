import { Routes } from '@angular/router';
import { ReactiveComponent } from './reactive/reactive.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';

export const routes: Routes = [
    { path: 'reactive', component: ReactiveComponent },
    { path: 'template-driven', component: TemplateDrivenComponent },
  ];
