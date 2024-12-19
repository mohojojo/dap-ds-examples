import { JSX } from "solid-js";
import { onMount } from "solid-js";

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'dap-ds-button': any;
    }
  }
}

type HtmlButtonType = 'button' | 'submit' | 'reset';

type DapDSButtonSolidProps = Partial<{
  children: JSX.Element;
  htmlType: HtmlButtonType;
  onClick: (event: Event) => void;
}>

const DapDSButtonSolid = (props: DapDSButtonSolidProps): JSX.Element => {
  let buttonRef: HTMLElement | null = null;

  const handleClick = (event: CustomEvent) => {
    if (props.onClick) {
      props.onClick(event);
    }
  };

  onMount(() => {
    if (buttonRef) {
      // Ensure children are set correctly as the content
      if (props.children) {
        buttonRef.innerHTML = ""; // Clear existing content
        buttonRef.append(props.children as Node);
      }
    }
  });

  return <dap-ds-button
    ref={(el: HTMLElement | null) => buttonRef = el}
    htmlType={props.htmlType}
    on:click={handleClick}
  ></dap-ds-button>;
};

export default DapDSButtonSolid;
