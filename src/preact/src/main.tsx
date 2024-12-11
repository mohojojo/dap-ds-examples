import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import 'dap-design-system/dist/light.theme.css'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat' // ES 2015
import localeData from 'dayjs/plugin/localeData'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { DapDSSnackbarReact } from 'dap-design-system/dist/react';

dayjs.extend(localeData)
dayjs.extend(LocalizedFormat)
dayjs.extend(customParseFormat)

const Root = () => (
    <div>
      <DapDSSnackbarReact></DapDSSnackbarReact>
      <App />
    </div>
  );
render(<Root />, document.getElementById('app')!);