import { JSX } from 'solid-js';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-stack': any;
    }
  }
}

export const DapDSSolid = (props: JSX.HTMLAttributes<HTMLElement>) => {
  return <dap-ds-stack {...props}>{props.children}</dap-ds-stack>;
};

export default DapDSSolid;