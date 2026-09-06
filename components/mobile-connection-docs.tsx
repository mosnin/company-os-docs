import { Callout, PageIntro, Section } from "@/components/doc-primitives";

export function MobileConnectionDocs() {
  return <>
    <PageIntro title="Mobile app and connections" description="The same company ledger on a smaller screen, with truthful installation and connection states." />
    <Callout title="Release status">These capabilities are implemented on the coordinated integration branch. Repository tests are not proof that a production deployment or a physical-device installation has completed.</Callout>
    <Section id="install" title="Install the web app">
      <p>Open your own profile for installation help. Supported browsers offer an Install app action. On iPhone or iPad, use Safari’s Share menu and Add to Home Screen. Browser availability varies; dismissing an installation prompt does not install anything.</p>
      <p>The installed app opens the same authenticated product in a standalone window. Company membership and permissions are unchanged. PWA installation is separate from adding a Company OS kernel.</p>
    </Section>
    <Section id="offline" title="Offline and updates">
      <p>The app needs a connection to read and change company data. Its service worker stores only a public offline recovery page, never authenticated pages, company records, API responses or pending edits. Offline navigation offers Try again after connectivity returns.</p>
      <p>It does not queue or replay writes, force a reload, or immediately replace an active worker. This helps avoid interrupting unsaved work. Browser app updates do not install or update Company OS kernels; the connected host owns those operations.</p>
    </Section>
    <Section id="stored" title="Stored account ownership">
      <p>The Brain says Not connected until a Stored account and organization binding have been confirmed. Pending or failed setup must not appear connected. A connection requires account and organization identifiers and the memory read permission; this status is not a live provider-health probe.</p>
      <p>An owner or admin can connect Stored and choose an authorized organization. Automatic setup is acceptable only if the founder can subsequently sign in to the actual Stored account, access that same organization and recover access. Company OS requires a verified founder email before sending a partner provisioning request.</p>
      <Callout title="Account handoff is not yet verified">The client-side provisioning contract exists, but the corresponding Stored implementation and founder sign-in handoff have not been verified. Do not describe automatic setup as working SSO or imply that the normal Stored login page proves access to a provisioned organization.</Callout>
    </Section>
    <Section id="verification" title="Verification boundaries">
      <p>Browser regression tests cover narrow layouts, accessibility, selected interactions, service-worker registration and offline recovery using a stand-in backend. Live authorization, billing, persistent external writes and real device installation need separate testing.</p>
      <p>Design OS refinement uses explicit hierarchy, composition, material, detail and responsive decisions before implementation. Automated checks are evidence for specific behaviors, not a certificate of premium design quality or a substitute for representative-user testing.</p>
    </Section>
  </>;
}
