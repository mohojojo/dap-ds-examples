import { createEffect, JSX, onCleanup } from "solid-js";
import { onMount } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-input': any;
    }
  }
}

export const emitDdsChange = () => {
    const event = new CustomEvent('dds-change', {
      detail: { message: 'Data has changed!' },
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event); // Emit the event globally
  };

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
    console.log(event?.detail?.value); // Handle the emitted event
  };

  createEffect(() => {
    const element = inputRef;

    // Add event listener for custom event
    element?.addEventListener('dds-change', handleDdsChange);

    // Cleanup listener on component unmount
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
    >
    </dap-ds-input>;
};

export default DapDSInputSolid;
