/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import 'dap-design-system/dist/light.theme.css'

export default function ClientApplication() {
  useEffect(() => {
    async function getComponents() {
      await import('dap-design-system/dist/dds')
      await import('dap-design-system/dist/react')
    }

    getComponents()
  }, [])

  return null
}


startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ClientApplication />
      <RemixBrowser />
    </StrictMode>
  );
});
