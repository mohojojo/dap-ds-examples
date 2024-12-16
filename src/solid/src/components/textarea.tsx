import { createEffect, JSX, onCleanup } from "solid-js";
import { onMount } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-textarea': any;
    }
  }
}

type DapDSTextareaSolidProps = Partial<{
    children: JSX.Element;
    id: string;
    label: string;
    name: string;
    value: string;
    feedback: string;
    feedbackType: string;
    onDdsChange: (value: string) => void;
}>

const DapDSTextareaSolid = (props: DapDSTextareaSolidProps): JSX.Element => {
  let textareaRef: HTMLElement | null = null;
  const handleDdsChange = (event: CustomEvent) => {
    if (props.onDdsChange) {
      props.onDdsChange(event?.detail?.value);
    }
  };

  createEffect(() => {
    const element = textareaRef;
    element?.addEventListener('dds-change', handleDdsChange);

    onCleanup(() => {
      element?.removeEventListener('dds-change', handleDdsChange);
    });
  });

  onMount(() => {
    if (textareaRef) {
      // Ensure children are set correctly as the content
      if (props.children) {
        textareaRef.innerHTML = ""; // Clear existing content
        textareaRef.append(props.children as Node);
      }
    }
  });

  return <dap-ds-textarea
    id={props.id}
    ref={(el: HTMLElement | null) => textareaRef = el}
    label={props.label}
    name={props.name}
    feedbackType={props.feedbackType}
    value={props.value}
    feedback={props.feedback}
    on:ddsChange={handleDdsChange}
    >
    </dap-ds-textarea>;
};

export default DapDSTextareaSolid;
