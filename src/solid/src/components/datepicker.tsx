import { createEffect, JSX, onCleanup } from "solid-js";
import { onMount } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-datepicker': any;
    }
  }
}

export const emitDdsChange = () => {
  const event = new CustomEvent('dds-change', {
    detail: { message: 'Data has changed!' },
    bubbles: true,
    composed: true,
  });
  window.dispatchEvent(event);
};

type DapDSDatePickerSolidProps = Partial<{
    children: JSX.Element;
    id: string;
    label: string;
    name: string;
    value: string;
    feedback: string;
    feedbackType: string;
    onDdsChange: (value: string) => void;
}>



const DapDSDatePickerSolid = (props: DapDSDatePickerSolidProps): JSX.Element => {
  let datePickerRef: HTMLElement | null = null;

  const handleDdsChange = (event: CustomEvent) => {
    if (props.onDdsChange) {
      props.onDdsChange(event?.detail?.value);
    }
  };

  createEffect(() => {
    const element = datePickerRef;
    element?.addEventListener('dds-change', handleDdsChange);
    onCleanup(() => {
      element?.removeEventListener('dds-change', handleDdsChange);
    });
  });

  onMount(() => {
    if (datePickerRef) {
      if (props.children) {
        datePickerRef.innerHTML = "";
        datePickerRef.append(props.children as Node);
      }
    }
  });

  return <dap-ds-datepicker
    id={props.id}
    ref={(el: HTMLElement | null) => datePickerRef = el}
    label={props.label}
    name={props.name}
    feedbackType={props.feedbackType}
    value={props.value}
    feedback={props.feedback}
    on:ddsChange={handleDdsChange}
    >
    </dap-ds-datepicker>;
};

export default DapDSDatePickerSolid;
