import { createEffect, JSX, onCleanup } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-select': any;
    }
  }
}

type DapDSSelectSolidProps = Partial<{
    children: JSX.Element;
    id: string;
    label: string;
    name: string;
    value: string;
    feedback: string;
    feedbackType: string;
    onDdsChange: (value: string) => void;
}>

const DapDSSelectSolid = (props: DapDSSelectSolidProps): JSX.Element => {
  let selectRef: HTMLElement | null = null;

  const handleDdsChange = (event: CustomEvent) => {
    console.log(event);
    if (props.onDdsChange) {
      props.onDdsChange(event?.detail?.value);
    }
  };

  createEffect(() => {
    const element = selectRef;
    element?.addEventListener('dds-change', handleDdsChange);

    onCleanup(() => {
      element?.removeEventListener('dds-change', handleDdsChange);
    });
  });

  return <dap-ds-select
    id={props.id}
    ref={(el: HTMLElement | null) => selectRef = el}
    label={props.label}
    name={props.name}
    feedbackType={props.feedbackType}
    value={props.value}
    feedback={props.feedback}
    on:ddsChange={handleDdsChange}
    >{props.children}
    </dap-ds-select>;
};

export default DapDSSelectSolid;
