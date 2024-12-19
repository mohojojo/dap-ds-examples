import { JSX } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-snackbar': any;
    }
  }
}

const DapDSSnackbarSolid = (): JSX.Element => {
  return <dap-ds-snackbar></dap-ds-snackbar>;
};

export default DapDSSnackbarSolid;
