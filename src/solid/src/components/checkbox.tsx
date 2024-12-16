import { createEffect, JSX, onCleanup } from "solid-js";
import { onMount } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-checkbox': any;
    }
  }
}

type DapDSCheckboxSolidProps = Partial<{
    children: JSX.Element;
    id: string;
    label: string;
    checked: boolean;
    name: string;
    value: string;
    feedback: string;
    feedbackType: string;
    onDdsChange: (value: boolean) => void;
}>

const DapDSCheckboxSolid = (props: DapDSCheckboxSolidProps): JSX.Element => {
  let checkboxRef: HTMLElement | null = null;
  const handleDdsChange = (event: CustomEvent) => {
    if (props.onDdsChange) {
      props.onDdsChange(event?.detail?.value);
    }
  };

  createEffect(() => {
    const element = checkboxRef;
    element?.addEventListener('dds-change', handleDdsChange);

    onCleanup(() => {
      element?.removeEventListener('dds-change', handleDdsChange);
    });
  });

  onMount(() => {
    if (checkboxRef) {
      // Ensure children are set correctly as the content
      if (props.children) {
        checkboxRef.innerHTML = ""; // Clear existing content
        checkboxRef.append(props.children as Node);
      }
    }
  });

  return <dap-ds-checkbox
    id={props.id}
    ref={(el: HTMLElement | null) => checkboxRef = el}
    label={props.label}
    name={props.name}
    feedbackType={props.feedbackType}
    value={props.value}
    feedback={props.feedback}
    on:ddsChange={handleDdsChange}
    >
    </dap-ds-checkbox>;
};

export default DapDSCheckboxSolid;
