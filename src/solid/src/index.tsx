/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import 'dap-design-system/dist/light.theme.css'
import './custom-elements.d.ts';
import 'dap-design-system/dist/dds.js';
import App from './App.tsx'

const root = document.getElementById('root')
render(() => <App />, root!)