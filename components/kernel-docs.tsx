import { CodeBlock } from "@/components/code-block";
import { Callout, InlineLink, PageIntro, Section, ToolTable } from "@/components/doc-primitives";

export function KernelDocs() {
  return <>
    <PageIntro title="Private kernels" description="Add independently versioned capabilities to Company OS without merging their repositories or replacing company data." />
    <Section id="model" title="One host, separate kernels">
      <p>Business OS is selected by default on first authenticated host startup. Design OS and other kernels are per-company opt-ins. Returning to an already configured runtime does not reinstall satisfied dependencies.</p>
      <p>Company OS owns execution controls and the local installer. Business OS and Design OS are separate private packages under <code>@mosnin</code>. Product OS has a draft contract but no authored capabilities yet.</p>
      <p>The web app records what the company wants installed. MCP carries that request to the local runtime, which validates and installs the packages, then reports the result. A saved selection is not an installation or update command. Re-registering it does not advance the configuration revision.</p>
      <Callout title="Release boundary">The protocol implementation, registry publication and web deployment are separate steps. Do not assume a package exists just because its name appears in the catalog.</Callout>
    </Section>
    <Section id="connect" title="Connect a runtime">
      <p>In the web app, open Settings, then Manage kernels. Owners and admins select kernels. This page is configuration only: Company OS itself installs and updates packages. Configured kernels have no Update button. Give the local runtime a company-bound key with <code>kernels:report</code>. Only grant <code>kernels:manage</code> if that key also needs to change the selections.</p>
      <p>Set <code>COMPANY_OS_MCP_URL</code> to your trusted HTTPS MCP endpoint and <code>COMPANY_OS_MCP_TOKEN</code> through your secret manager. Set <code>COMPANY_OS_REGISTRY_TOKEN</code> to a classic GitHub PAT with <code>read:packages</code> and access to the private kernel packages. Never store these secrets in company documents or source control.</p>
      <CodeBlock code={`python3 scripts/kernels.py init --project /absolute/project\npython3 scripts/kernels.py sync --project /absolute/project\npython3 scripts/kernels.py status --project /absolute/project`} />
      <p>These commands run from a Company OS checkout. Installed skill distributions use <code>elastic-company-os/scripts/kernel_manager.py</code> in place of the repository wrapper.</p>
    </Section>
    <Section id="updates" title="Check at initialization, update on request">
      <p>New project initialization creates version metadata. Session initialization verifies installed files and checks the registry using a 24-hour cache. It does not update silently or poll before every task. Offline checks remain unknown, not current.</p>
      <p>Use the <code>update-kernels</code> MCP prompt, often shown as <code>/update-kernels</code> by clients. Run update-kernels inside Company OS for both web-bound and local-only projects. Web-bound updates pull approved configuration and report completion. Ordinary sync only installs missing kernels and preserves existing versions.</p>
      <CodeBlock code={`# Explicit update inside Company OS\npython3 scripts/kernels.py update-kernels --project /absolute/project\n# Check only, without using the cache\npython3 scripts/kernels.py check --project /absolute/project`} />
      <p>An exact version stays pinned. Caret, tilde and bounded ranges allow deliberate update policies. A major-version expansion requires a new approved constraint.</p>
    </Section>
    <Section id="state" title="Versions and company data stay separate">
      <CodeBlock code={`.company-os/kernels/\n  state.json                 active versions, constraints and file hashes\n  history/<generation>.json rollback snapshots\n  objects/<sha256>/          downloaded packages\n  data/<kernel-id>/          company-owned artifacts\n  overrides/<kernel-id>/     company-owned adaptations`} />
      <p>The lock state records Company OS distribution version, kernel protocol, environment ID, generation, exact installed versions, archive integrity, file hashes and update-check times. Web-bound state also records the company and requested revision. Company data and overrides are never overwritten by package updates.</p>
    </Section>
    <Section id="mcp" title="A scoped MCP handshake">
      <ToolTable rows={[
        { name: "kernels_status", capability: "context:read", purpose: "Read desired versions and runtime-reported installations for the bearer key's company." },
        { name: "kernels_request", capability: "kernels:manage", purpose: "Save a revision-checked request. Does not install files." },
        { name: "kernels_report", capability: "kernels:report", purpose: "Submit a locally verified, generation-bound receipt for the requested revision." },
      ]} />
      <p>Existing write keys do not gain these new grants. Reports are runtime attestations, not server verification of a remote filesystem. Old revisions, conflicting generations and receipts missing requested versions are refused. A runtime identity is bound to its first reporting key.</p>
    </Section>
    <Section id="recovery" title="Fail safely and recover">
      <p>All dependencies stage before one atomic activation. Configuration reconciliation preserves satisfying installed versions, including when another kernel is added. The explicit Company OS update command is the only upgrade-enabled path. The installer verifies archive integrity and compatibility, refuses cycles and unsafe paths, and never runs package scripts. Changed installed files and data schema migrations stop the update. Existing active versions and company data are preserved on validation failure.</p>
      <CodeBlock code={`# Retry receipt delivery without reinstalling\npython3 scripts/kernels.py report --project /absolute/project\n# Activate a retained version set as a new generation\npython3 scripts/kernels.py rollback --generation 1 --project /absolute/project`} />
      <p>A failed report can follow a successful local installation. Inspect status first. A newer web request needs another sync. Uninstall, garbage collection, automatic data migration and runtime-key ownership transfer are not part of v1.</p>
    </Section>
    <Section id="authors" title="Make a compatible kernel">
      <p>Each private repository declares <code>company-os.kernel.json</code>, a matching scoped package, entrypoints, exact kernel dependencies, host compatibility, a data schema version and no new permissions. Product OS stays draft until real capability content and tests exist.</p>
      <p>Use the <InlineLink href="/contracts/kernel-v1.schema.json">versioned manifest schema</InlineLink> and the executable validator. Supported stable constraints are exact versions, caret, tilde and bounded ranges. Wildcards, tags and prereleases are refused.</p>
      <CodeBlock code={`python3 scripts/validate_company_os_kernel.py validate --package .\nnpm pack --ignore-scripts --dry-run`} />
      <p>Bun reads the private scope configuration; npm reads .npmrc. Raw bun add downloads packages, but the Company OS installer activates and records kernels. Publish reviewed tags through the manual private-package workflow after configuring required reviewers on its kernel-release environment. Cross-repository consumers need explicit package read access.</p>
      <p>Keep contract changes, tests, initialization rules, MCP and documentation in the same coordinated release. The <InlineLink href="https://github.com/mosnin/companyos/blob/main/docs/kernels.md">canonical repository guide</InlineLink> contains the maintenance and recovery contract.</p>
    </Section>
  </>;
}
