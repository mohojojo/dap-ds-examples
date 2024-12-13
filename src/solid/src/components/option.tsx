import { JSX } from "solid-js";
import { onMount } from "solid-js";

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
    onDdsChange: (value: string) => void;
}>

const DapDSOptionItemSolid = (props: DapDSOptionItemSolidProps): JSX.Element => {
  let selectRef: HTMLElement | null = null;

  const handleDdsChange = (event: CustomEvent) => {
    console.log(event);
    if (props.onDdsChange) {
      props.onDdsChange(event.detail);
    }
  };

  onMount(() => {
    if (selectRef) {
      // Ensure children are set correctly as the content
      if (props.children) {
        selectRef.innerHTML = ""; // Clear existing content
        selectRef.append(props.children as Node);
      }
    }
  });

  return <dap-ds-option-item
    id={props.id}
    ref={(el: HTMLElement | null) => selectRef = el}
    label={props.label}
    name={props.name}
    feedbackType={props.feedbackType}
    value={props.value}
    feedback={props.feedback}
    on:ddsChange={handleDdsChange}
    >
    </dap-ds-option-item>;
};

export default DapDSOptionItemSolid;
