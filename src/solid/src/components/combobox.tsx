import { createEffect, JSX, onCleanup } from "solid-js";
import { onMount } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-combobox': any;
    }
  }
}

type DapDSComboboxSolidProps = Partial<{
    children: JSX.Element;
    id: string;
    label: string;
    name: string;
    placeholder: string;
    value: string;
    feedback: string;
    feedbackType: string;
    onDdsInput: (input: string) => void;
}>

const DapDSComboboxSolid = (props: DapDSComboboxSolidProps): JSX.Element => {
  let comboboxRef: HTMLElement | null = null;
  const handleDdsInput = (event: CustomEvent) => {
    if (props.onDdsInput) {
      props.onDdsInput(event?.detail?.input);
    }
  };

  createEffect(() => {
    const element = comboboxRef;
    element?.addEventListener('dds-input', handleDdsInput);

    onCleanup(() => {
      element?.removeEventListener('dds-input', handleDdsInput);
    });
  });

  onMount(() => {
    if (comboboxRef) {
      // Ensure children are set correctly as the content
      if (props.children) {
        comboboxRef.innerHTML = ""; // Clear existing content
        comboboxRef.append(props.children as Node);
      }
    }
  });

  return <dap-ds-combobox
    id={props.id}
    ref={(el: HTMLElement | null) => comboboxRef = el}
    label={props.label}
    name={props.name}
    feedbackType={props.feedbackType}
    value={props.value}
    feedback={props.feedback}
    on:ddsInput={handleDdsInput}
    >
    </dap-ds-combobox>;
};

export default DapDSComboboxSolid;
