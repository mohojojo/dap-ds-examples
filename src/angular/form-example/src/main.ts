import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'dap-design-system/dist/dds.js';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
