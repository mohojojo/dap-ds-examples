import { createEffect, JSX, onCleanup } from "solid-js";
import { onMount } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-input': any;
    }
  }
}

type DapDSInputSolidProps = Partial<{
    children: JSX.Element;
    id: string;
    label: string;
    name: string;
    value: string;
    feedback: string;
    feedbackType: string;
    onDdsChange: (value: string) => void;
}>

const DapDSInputSolid = (props: DapDSInputSolidProps): JSX.Element => {
  let inputRef: HTMLElement | null = null;
  const handleDdsChange = (event: CustomEvent) => {
    if (props.onDdsChange) {
      props.onDdsChange(event?.detail?.value);
    }
  };

  createEffect(() => {
    const element = inputRef;
    element?.addEventListener('dds-change', handleDdsChange);

    onCleanup(() => {
      element?.removeEventListener('dds-change', handleDdsChange);
    });
  });

  onMount(() => {
    if (inputRef) {
      // Ensure children are set correctly as the content
      if (props.children) {
        inputRef.innerHTML = ""; // Clear existing content
        inputRef.append(props.children as Node);
      }
    }
  });

  return <dap-ds-input
    id={props.id}
    ref={(el: HTMLElement | null) => inputRef = el}
    label={props.label}
    name={props.name}
    feedbackType={props.feedbackType}
    value={props.value}
    feedback={props.feedback}
    on:ddsChange={handleDdsChange}
    >
    </dap-ds-input>;
};

export default DapDSInputSolid;
