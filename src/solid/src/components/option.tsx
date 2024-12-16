import { JSX } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-option-item': any;
    }
  }
}

type DapDSOptionItemSolidProps = Partial<{
    children: JSX.Element;
    id: string;
    label: string;
    name: string;
    value: string;
    feedback: string;
    feedbackType: string;
}>

const DapDSOptionItemSolid = (props: DapDSOptionItemSolidProps): JSX.Element => {
  return <dap-ds-option-item
    id={props.id}
    label={props.label}
    name={props.name}
    feedbackType={props.feedbackType}
    value={props.value}
    feedback={props.feedback}
    >{props.children}
    </dap-ds-option-item>;
};

export default DapDSOptionItemSolid;
