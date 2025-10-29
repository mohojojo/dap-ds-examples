import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app.component'
import 'dap-design-system'

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err))
