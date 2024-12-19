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
    key: number;
    label: string;
    name: string;
    value: string;
    feedback: string;
    feedbackType: string;
    selected: boolean;
}>

const DapDSOptionItemSolid = (props: DapDSOptionItemSolidProps): JSX.Element => {
  return <dap-ds-option-item
    id={props.id}
    label={props.label}
    key={props.key}
    name={props.name}
    feedbackType={props.feedbackType}
    value={props.value}
    feedback={props.feedback}
    selected={props.selected}
    >{props.children}
    </dap-ds-option-item>;
};

export default DapDSOptionItemSolid;
