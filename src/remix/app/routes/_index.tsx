import type { MetaFunction } from "@remix-run/node";
import { DapDSButtonReact, DapDSCheckboxReact, DapDSComboboxReact, DapDSDatePickerReact, DapDSInputReact, DapDSOptionItemReact, DapDSSelectReact, DapDSStackReact, DapDSTextareaReact } from 'dap-design-system/dist/react'

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center gap-16">
        This is my Remix.js form!
      </div>
    </div>
  );
}
