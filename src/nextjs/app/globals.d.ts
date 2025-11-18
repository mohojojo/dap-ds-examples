import { MessageOptionsType } from "./types"

declare global {
  interface Window {
    showDapSnackbar?: (message: string, options?: MessageOptionsType) => void
  }
}

export {}

declare namespace JSX {
  interface IntrinsicElements {
    "dap-ds-button": import("dap-design-system/react-types").DapDSButtonType
    "dap-ds-checkbox": import("dap-design-system/react-types").DapDSCheckboxType
    "dap-ds-combobox": import("dap-design-system/react-types").DapDSComboboxType
    "dap-ds-stack": import("dap-design-system/react-types").DapDSStackType
    "dap-ds-datepicker": import("dap-design-system/react-types").DapDSDatePickerType
    "dap-ds-input": import("dap-design-system/react-types").DapDSInputType
    "dap-ds-option-item": import("dap-design-system/react-types").DapDSOptionItemType
    "dap-ds-select": import("dap-design-system/react-types").DapDSSelectType
    "dap-ds-textarea": import("dap-design-system/react-types").DapDSTextareaType
    "dap-ds-snackbar": import("dap-design-system/react-types").DapDSSnackbarType
  }
}

declare module "dap-design-system/dist/dds.js"
