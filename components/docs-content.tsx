import { CodeBlock } from "@/components/code-block";
import {
  Callout,
  InlineLink,
  PageIntro,
  Section,
  SplitChoice,
  Step,
  Steps,
  ToolTable,
} from "@/components/doc-primitives";
import type { DocPage } from "@/lib/docs";

const frameworkRepository = "https://github.com/mosnin/companyos";
const webRepository = "https://github.com/mosnin/company-os-web";
const appUrl = "https://www.companyos.sh";
const mcpEndpoint = "https://www.companyos.sh/api/mcp";

const readTools = [
  { name: "config_pull", capability: "context:read", purpose: "Pull the company profile, branches, registry, and committed document index." },
  { name: "document_get", capability: "context:read", purpose: "Read one typed document or the empty template for a document kind." },
  { name: "context_search", capability: "context:read", purpose: "Search company documents and return compact, revision-aware hits." },
  { name: "feedback_list", capability: "context:read", purpose: "Read raw customer feedback attached to product documents." },
  { name: "context_changes", capability: "context:read", purpose: "Poll commits, branch events, reverts, and feedback from a cursor." },
  { name: "document_history", capability: "context:read", purpose: "Read the immutable commit log for one document." },
  { name: "document_list", capability: "context:read", purpose: "List documents, with optional department and branch filters." },
  { name: "branch_list", capability: "context:read", purpose: "List open, merged, and abandoned branches with their counts." },
  { name: "branch_diff", capability: "context:read", purpose: "Compare a branch with main and identify conflicts before merge." },
  { name: "merge_list", capability: "context:read", purpose: "Read the settled register of merges and their receipts." },
  { name: "schema_describe", capability: "context:read", purpose: "Read every department, document kind, field, and authoring shape." },
];

const changeTools = [
  { name: "document_put", capability: "context:write", purpose: "Commit a revision with typed content, a message, and base_revision." },
  { name: "branch_create", capability: "branch:create", purpose: "Open an isolated branch for a draft or alternate strategy." },
  { name: "feedback_add", capability: "feedback:write", purpose: "Append verbatim customer feedback to a product document." },
  { name: "run_append", capability: "run:append", purpose: "Append framework mission telemetry to Runs and the timeline." },
];

const protectedTools = [
  { name: "document_revert", capability: "context:revert", purpose: "Restore earlier content as a new forward revision." },
  { name: "branch_merge", capability: "branch:merge", purpose: "Land a branch on main after resolving any conflicts." },
  { name: "merge_revert", capability: "branch:merge", purpose: "Undo a merge by committing its prior content forward." },
];

function OverviewPage() {
  return (
    <>
      <PageIntro
        title="Company OS documentation"
        description="Company OS gives autonomous companies a shared place for context and an open source control plane for execution. Start here, then follow the path that matches what you want to do."
      />

      <Section id="two-parts" title="Two parts, one system">
        <div className="split-choices">
          <SplitChoice title="Web app" href="/app/quickstart/" action="Set up the context ledger">
            <p>
              A hosted, GitHub-like ledger for company context. Each department gets typed pages, version history, branches, and a shared main view.
            </p>
          </SplitChoice>
          <SplitChoice title="Open source framework" href="/framework/install/" action="Install the control plane">
            <p>
              A project-isolated framework that turns direction into bounded work with explicit authority, evidence, review, and acceptance.
            </p>
          </SplitChoice>
        </div>
        <Callout title="The simplest distinction">
          <p>The app stores what the company knows. The framework governs how agents work. MCP lets the framework read and update the app without mixing those responsibilities.</p>
        </Callout>
      </Section>

      <Section id="choose-a-path" title="Choose a path">
        <Steps>
          <Step title="I want a shared company brain">
            <p>Start with the <InlineLink href="/app/quickstart/">web app quickstart</InlineLink>. Create a company and add the pages that agents and people need most.</p>
          </Step>
          <Step title="I want governed agent execution">
            <p>Install the <InlineLink href="/framework/install/">open source framework</InlineLink>. It runs locally and keeps each project isolated.</p>
          </Step>
          <Step title="I want agents to use company context">
            <p>Create a key on the app’s Agents page, then <InlineLink href="/mcp/connect/">connect through MCP</InlineLink>.</p>
          </Step>
        </Steps>
      </Section>

      <Section id="truth-boundaries" title="Truth boundaries">
        <p>
          Company OS is designed to make claims easy to audit. A green local test proves local behavior. It does not prove a provider call, a production deployment, or an accepted company outcome. The app and framework keep those states separate on purpose.
        </p>
        <ul>
          <li><strong>Context truth:</strong> immutable document revisions and content hashes in the web ledger.</li>
          <li><strong>Execution truth:</strong> project-local controller state, ordered events, evidence, leases, and decisions.</li>
          <li><strong>Provider truth:</strong> live external behavior that must be tested against the configured provider.</li>
          <li><strong>Acceptance truth:</strong> a decision from the authority named in the governing contract.</li>
        </ul>
      </Section>
    </>
  );
}

function MentalModelPage() {
  return (
    <>
      <PageIntro title="Mental model" description="Treat Company OS as two connected systems with a narrow, explicit bridge." />
      <Section id="context" title="Context lives in the app">
        <p>
          The web app is the company’s context ledger. Strategy, product, finance, operations, people, marketing, customer work, and other departments each get structured pages. Every commit creates a new revision instead of overwriting history.
        </p>
        <p>Use the app when the question is: “What does the company currently believe, and how did that belief change?”</p>
      </Section>
      <Section id="execution" title="Execution lives in the framework">
        <p>
          The open source framework is the execution control plane. It turns a broad objective into measurable outcomes, bounded work, evidence requirements, review gates, and explicit terminal decisions. Each project owns its own local state.
        </p>
        <p>Use the framework when the question is: “What work is authorized, who owns it, what proves it, and who can accept it?”</p>
      </Section>
      <Section id="connection" title="MCP connects them">
        <p>
          MCP exposes the hosted ledger as a stateless Streamable HTTP server. An agent key selects one company and carries a capability grant. The framework can read company context before work, commit new context after evidence, and append run telemetry without becoming the source of ledger authority.
        </p>
        <Callout title="A useful boundary" tone="dark">
          <p>The MCP server is not the execution controller. It stores context and history. Dispatch, budgets, leases, quality, and acceptance stay in the framework.</p>
        </Callout>
      </Section>
      <Section id="example-loop" title="A practical loop">
        <Steps>
          <Step title="Pull the current company map"><p>The agent calls <code>config_pull</code> and <code>schema_describe</code> before it invents structure.</p></Step>
          <Step title="Run bounded work"><p>The framework supplies the outcome, scope, evidence, budget, and reviewer contract.</p></Step>
          <Step title="Commit what changed"><p>The agent calls <code>document_put</code> with a message and the revision it read.</p></Step>
          <Step title="Review before changing main"><p>Drafts can live on a branch. Landing one on main requires the separate <code>branch:merge</code> capability.</p></Step>
        </Steps>
      </Section>
    </>
  );
}

function AppQuickstartPage() {
  return (
    <>
      <PageIntro title="Web app quickstart" description="Create a useful company context ledger in four short steps." />
      <Section id="create-company" title="Create a company">
        <p>Open <InlineLink href={appUrl}>Company OS</InlineLink>, create an account, and create a company. The company slug becomes part of its workspace URL.</p>
        <Callout title="Use real operating language">
          <p>Name the company and its pages the way your team already talks. Agents perform better when the ledger matches the operating vocabulary people use.</p>
        </Callout>
      </Section>
      <Section id="add-context" title="Add the first context">
        <p>Start with the small set that changes decisions. A practical first pass is:</p>
        <ul>
          <li>mission, thesis, and current company objectives</li>
          <li>customer and product definition</li>
          <li>current priorities, risks, and constraints</li>
          <li>department owners and approval boundaries</li>
          <li>the latest decisions that agents must not guess</li>
        </ul>
        <p>Commit focused changes with a short message that explains why the context changed.</p>
      </Section>
      <Section id="invite-team" title="Invite your team">
        <p>
          Add people from the Members page. Give the smallest role that matches their job. Owners and admins manage privileged company settings, while ordinary members can work with company context without receiving administrative authority.
        </p>
      </Section>
      <Section id="connect-agent" title="Connect an agent">
        <Steps>
          <Step title="Open Agents"><p>Choose the company, then open the Agents page from the app navigation.</p></Step>
          <Step title="Issue a key"><p>Give it a recognizable name and select only the capabilities and department lanes it needs.</p></Step>
          <Step title="Copy the token"><p>The <code>cos_</code> token is shown once. Store it in a secret manager or environment variable.</p></Step>
          <Step title="Configure the client"><p>Continue to <InlineLink href="/mcp/clients/">client setup</InlineLink> for Claude Code, Cursor, or Codex.</p></Step>
        </Steps>
      </Section>
    </>
  );
}

function ContextLedgerPage() {
  return (
    <>
      <PageIntro title="The context ledger" description="The web app stores company knowledge like a source repository stores code: typed, attributable, and reversible." />
      <Section id="documents" title="Documents and departments">
        <p>
          A document belongs to a registry kind and appears in a department view. The registry defines its fields, field types, table shapes, and authoring hints. This gives people a clear page to edit and gives agents a schema they can discover instead of guess.
        </p>
        <p>Call <code>schema_describe</code> over MCP to read the same registry shape agents must follow.</p>
      </Section>
      <Section id="revisions" title="Revisions and hashes">
        <p>
          Every commit appends a revision. The ledger calculates a SHA-256 content hash over canonical JSON, so a specific artifact can be cited from the open source framework without depending on a mutable page URL.
        </p>
        <Callout title="No silent overwrite">
          <p>An MCP write includes <code>base_revision</code>. If another writer moved the document after it was read, the stale write is refused.</p>
        </Callout>
      </Section>
      <Section id="branches" title="Branches and main">
        <p>
          Main is the company’s shared truth. A branch is a draft overlay for a pivot, reorganization, plan, or other alternate state. Agents can write to a branch without changing what everyone reads on main.
        </p>
        <p>Before merge, <code>branch_diff</code> reports added, clean, identical, and conflicting documents. <code>branch_merge</code> changes main and therefore needs a separate capability.</p>
      </Section>
      <Section id="history" title="History and reverts">
        <p>
          Reverts move forward. <code>document_revert</code> commits earlier content as a new revision. <code>merge_revert</code> applies the same principle to a merge receipt. Earlier history remains readable.
        </p>
      </Section>
    </>
  );
}

function AgentKeysPage() {
  return (
    <>
      <PageIntro title="Create an agent key" description="An agent key identifies one company and carries the smallest capability grant needed for its work." />
      <Section id="issue" title="Issue the key">
        <Steps>
          <Step title="Open the Agents page"><p>Enter the target company and choose Agents from its navigation.</p></Step>
          <Step title="Name the credential"><p>Use a name that identifies the agent, environment, and purpose, such as <code>research-agent-production</code>.</p></Step>
          <Step title="Set expiry and lanes"><p>Prefer short-lived keys and department lanes when the agent only works in one part of the company.</p></Step>
          <Step title="Copy once"><p>The full token is displayed only after issue. The ledger stores only its SHA-256 hash.</p></Step>
        </Steps>
      </Section>
      <Section id="capabilities" title="Choose capabilities">
        <dl className="definition-list">
          <div><dt><code>context:read</code></dt><dd>Read documents, schema, history, branches, merges, feedback, and resources.</dd></div>
          <div><dt><code>context:write</code></dt><dd>Commit a new document revision.</dd></div>
          <div><dt><code>branch:create</code></dt><dd>Open a draft branch.</dd></div>
          <div><dt><code>feedback:write</code></dt><dd>Append raw feedback to product documents.</dd></div>
          <div><dt><code>run:append</code></dt><dd>Append framework run telemetry.</dd></div>
          <div><dt><code>context:revert</code></dt><dd>Restore earlier document content as a new revision.</dd></div>
          <div><dt><code>branch:merge</code></dt><dd>Merge or revert a merge on main. This is never granted by default.</dd></div>
        </dl>
      </Section>
      <Section id="store" title="Store it safely">
        <CodeBlock label="Shell" code={`export COMPANYOS_API_KEY='cos_replace_with_the_token_you_copied'`} />
        <ul>
          <li>do not commit the token to Git</li>
          <li>do not paste it into issue trackers, screenshots, or docs</li>
          <li>use a separate key for each agent and environment</li>
          <li>rotate immediately if a token appears in logs or tool output</li>
        </ul>
      </Section>
      <Section id="audit" title="Audit and revoke">
        <p>
          The Agents page shows use, refusals, and credential status. Revoke a key when a task ends, an environment changes, or a token may be exposed. A refusal remains useful audit evidence because the server records the attempted verb and reason.
        </p>
      </Section>
    </>
  );
}

function FrameworkInstallPage() {
  return (
    <>
      <PageIntro title="Install the framework" description="The current supported path installs Company OS 0.6.0 from the canonical Git repository and verifies the content-addressed distribution." />
      <Section id="requirements" title="Requirements">
        <ul>
          <li>Python 3.11 or newer</li>
          <li>Git</li>
          <li>macOS or Linux for the current installer, which uses POSIX file locking</li>
          <li>an empty destination directory for the first skills install</li>
        </ul>
      </Section>
      <Section id="git-install" title="Install from Git">
        <CodeBlock code={`git clone https://github.com/mosnin/companyos.git
cd companyos
python3 scripts/distribution.py verify-manifest
python3 scripts/distribution.py install --target /absolute/path/to/skills`} />
        <p>
          Replace the target with the skills root used by your agent host. The installer stages and verifies both bundles before it changes the target.
        </p>
      </Section>
      <Section id="verify" title="Verify the source">
        <CodeBlock code={`python3 scripts/distribution.py verify-manifest
python3 -m unittest discover -s tests -v`} />
        <p>
          The first command proves that the committed distribution manifest matches the source bytes. The test suite proves local framework behavior. Neither command proves a live provider runtime or production scheduling.
        </p>
      </Section>
      <Section id="npm-status" title="npm release status">
        <Callout title="Not published yet" tone="warning">
          <p><code>@mosnin/companyos</code> is the planned package name. Do not use the command below until the package release is announced and its provenance is verified.</p>
        </Callout>
        <CodeBlock label="Planned command, release gated" code={`npx @mosnin/companyos install --target /absolute/path/to/skills`} />
        <p>
          npm will be a transport and installer for the Python skill distribution, not a Node SDK, MCP server, or hosted runtime. Publication remains gated on a repository license decision, npm account access, package smoke tests, a strict file allowlist, and a clean install from the packed tarball.
        </p>
      </Section>
    </>
  );
}

function FrameworkArchitecturePage() {
  return (
    <>
      <PageIntro title="Framework architecture" description="Company OS keeps canonical source, installed skills, project state, and privileged launch authority in separate layers." />
      <Section id="layers" title="Four authority layers">
        <ol>
          <li><strong>Canonical core repository:</strong> controller code, schemas, contracts, skills, tests, and releases.</li>
          <li><strong>Installed distribution:</strong> a content-addressed copy consumed by the agent host.</li>
          <li><strong>Project instance:</strong> strategy, work, evidence, metrics, adaptations, and runtime state for one project.</li>
          <li><strong>Protected launcher and issuer:</strong> privileged boundaries outside the managed project, required before recurring execution.</li>
        </ol>
      </Section>
      <Section id="project-isolation" title="Project isolation">
        <p>
          Every project gets its own <code>.company-os/</code> instance. The framework does not use one shared company ledger as runtime state. Client work cannot silently modify the canonical core, and one project cannot act as proof for another.
        </p>
      </Section>
      <Section id="control-store" title="Control store">
        <p>
          The accepted single-host authority substrate is a project-bound SQLite store. It holds programs, outcomes, work, cycles, leases, attempts, events, evidence, decisions, quality, and adaptations. Each accepted mutation appends an immutable state revision and one paired event in the same transaction.
        </p>
        <Callout title="Read-only brief">
          <p>The Operator Command Center projects the governed state as Markdown, JSON, or HTML. It does not grant authority or mutate the controller.</p>
        </Callout>
      </Section>
      <Section id="current-reality" title="Current reality">
        <p>
          Version 0.6.0 includes the outcome control plane and bounded pilot contracts. The full native task runtime remains disabled until controller admission, cancellation acknowledgement, installed fresh-thread role checks, and a clean multi-agent integration are proven. Provider execution and protected recurring scheduling remain separate authority gates.
        </p>
      </Section>
    </>
  );
}

function FrameworkOperatorsPage() {
  const controller = "python3 skills/company-os/elastic-company-os/scripts/company_os_controller.py";
  return (
    <>
      <PageIntro title="Operator commands" description="Use the controller as an explicit command surface. Read the current state before you mutate it." />
      <Section id="controller" title="Controller path">
        <CodeBlock code={`${controller} --help`} />
        <p>Run commands from the root of the cloned framework repository. Pass an absolute project path when possible.</p>
      </Section>
      <Section id="initialize" title="Initialize a project">
        <CodeBlock code={`${controller} init \\
  --project /absolute/path/to/project \\
  --name "Acme product launch" \\
  --project-type general \\
  --north-star "Launch a product customers can adopt"`} />
        <p>This creates one isolated project instance. It does not activate recurring work or grant provider authority.</p>
      </Section>
      <Section id="inspect" title="Audit and brief">
        <CodeBlock code={`${controller} audit \\
  --project /absolute/path/to/project

${controller} brief \\
  --project /absolute/path/to/project \\
  --format markdown \\
  --strict`} />
        <p>Use <code>--format json</code> for an agent-readable projection or <code>--format html</code> for the self-contained Operator Command Center.</p>
      </Section>
      <Section id="distribution" title="Distribution commands">
        <CodeBlock code={`python3 scripts/distribution.py verify-manifest
python3 scripts/distribution.py check-install --target /absolute/path/to/skills
python3 scripts/distribution.py recover-install --target /absolute/path/to/skills`} />
        <p>
          Recovery is explicit. If an interrupted journal or orphaned transaction directory exists, <code>check-install</code> fails and asks you to run <code>recover-install</code> first.
        </p>
      </Section>
      <Section id="advanced" title="Advanced mutations">
        <p>
          The controller also exposes commands for outcomes, evidence, work, quality, certification, leases, cycles, execution fabric state, and authenticated decisions. Read each subcommand’s <code>--help</code> before use. These commands are designed to refuse missing authority and incomplete evidence, so automation should treat a nonzero exit as a real gate.
        </p>
        <CodeBlock code={`${controller} record-evidence --help
${controller} queue-work --help
${controller} score-quality --help
${controller} cancel --help`} />
      </Section>
    </>
  );
}

function McpConnectPage() {
  return (
    <>
      <PageIntro title="Connect through MCP" description="Company OS exposes one authenticated, stateless Streamable HTTP endpoint for every company context ledger." />
      <Section id="before-you-start" title="Before you start">
        <ol>
          <li>Create or open a company in the web app.</li>
          <li>Open its Agents page.</li>
          <li>Issue a key with the capabilities your client needs.</li>
          <li>Save the one-time <code>cos_</code> token as <code>COMPANYOS_API_KEY</code>.</li>
        </ol>
      </Section>
      <Section id="endpoint" title="Endpoint">
        <CodeBlock label="Connection" code={`POST ${mcpEndpoint}
Authorization: Bearer cos_...
Content-Type: application/json
MCP-Protocol-Version: 2025-06-18`} />
        <p>The token selects the company. Tools do not accept a company ID or slug, so a caller cannot use one company’s key to name another tenant.</p>
      </Section>
      <Section id="handshake" title="Test the handshake">
        <CodeBlock label="curl" code={`curl -sS '${mcpEndpoint}' \\
  -H "Authorization: Bearer $COMPANYOS_API_KEY" \\
  -H 'Content-Type: application/json' \\
  -H 'MCP-Protocol-Version: 2025-06-18' \\
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"company-os-check","version":"1.0.0"}}}'`} />
        <p>A successful response identifies <code>company-os-ledger</code> version <code>1.6.0</code> and returns the capabilities held by that key.</p>
      </Section>
      <Section id="first-calls" title="Make the first calls">
        <p>Start with discovery. Do not guess document kinds or slugs.</p>
        <CodeBlock label="JSON-RPC sequence" code={`{"jsonrpc":"2.0","id":2,"method":"resources/list","params":{}}
{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"schema_describe","arguments":{}}}
{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"config_pull","arguments":{}}}`} />
        <p>Then use <code>document_get</code> before <code>document_put</code> so the write carries the revision you actually read.</p>
      </Section>
    </>
  );
}

function McpClientsPage() {
  return (
    <>
      <PageIntro title="Client setup" description="These examples use the current hosted endpoint and keep the bearer token in an environment variable." />
      <Callout title="Set the token first">
        <CodeBlock label="Shell" code={`export COMPANYOS_API_KEY='cos_replace_with_your_key'`} />
      </Callout>
      <Section id="claude-code" title="Claude Code">
        <p>Create <code>.mcp.json</code> in a project for a shared project definition, or add the same server at user scope. Claude Code expands environment variables in HTTP headers.</p>
        <CodeBlock label=".mcp.json" code={`{
  "mcpServers": {
    "company-os": {
      "type": "http",
      "url": "${mcpEndpoint}",
      "headers": {
        "Authorization": "Bearer \${COMPANYOS_API_KEY}"
      }
    }
  }
}`} />
        <p>Open Claude Code and run <code>/mcp</code> to inspect the connection. Project-scoped servers require a workspace trust decision.</p>
      </Section>
      <Section id="cursor" title="Cursor">
        <p>Create <code>.cursor/mcp.json</code> in the project or <code>~/.cursor/mcp.json</code> for a personal global configuration.</p>
        <CodeBlock label=".cursor/mcp.json" code={`{
  "mcpServers": {
    "company-os": {
      "url": "${mcpEndpoint}",
      "headers": {
        "Authorization": "Bearer \${env:COMPANYOS_API_KEY}"
      }
    }
  }
}`} />
        <p>Restart or reload MCP from Cursor settings, then check the MCP output if the server does not connect.</p>
      </Section>
      <Section id="codex" title="Codex">
        <p>The current Codex CLI accepts a Streamable HTTP URL and the name of an environment variable that holds the bearer token.</p>
        <CodeBlock label="Terminal" code={`codex mcp add company-os \\
  --url ${mcpEndpoint} \\
  --bearer-token-env-var COMPANYOS_API_KEY

codex mcp get company-os`} />
        <p>The equivalent entry is stored under <code>[mcp_servers.company-os]</code> in the Codex configuration. The CLI form is preferred because it writes the supported shape.</p>
      </Section>
      <Section id="verify-client" title="Verify the client">
        <ol>
          <li>Confirm the server reports <code>company-os-ledger 1.6.0</code>.</li>
          <li>Confirm the client sees exactly 18 tools.</li>
          <li>Call <code>resources/list</code> or <code>config_pull</code>.</li>
          <li>Read a document before testing a write.</li>
          <li>Use a disposable branch for the first write test.</li>
        </ol>
        <Callout title="Support scope" tone="warning">
          <p>These three client formats are documented and supported by their current clients. Other chat products are not claimed compatible until their authentication and MCP behavior are tested against the live endpoint.</p>
        </Callout>
      </Section>
    </>
  );
}

function McpContractPage() {
  return (
    <>
      <PageIntro title="MCP contract" description="The hosted ledger speaks a small, explicit wire contract: stateless Streamable HTTP, JSON-RPC 2.0, MCP revision 2025-06-18, and bearer authentication." />
      <Section id="wire" title="Wire contract">
        <dl className="definition-list">
          <div><dt>Endpoint</dt><dd><code>{mcpEndpoint}</code></dd></div>
          <div><dt>Transport</dt><dd>Streamable HTTP in stateless JSON mode, with one POST per request and no SSE stream.</dd></div>
          <div><dt>MCP revision</dt><dd><code>2025-06-18</code></dd></div>
          <div><dt>Server</dt><dd><code>company-os-ledger 1.6.0</code></dd></div>
          <div><dt>Ledger contract</dt><dd><code>context-ledger.v1</code></dd></div>
          <div><dt>Methods</dt><dd><code>initialize</code>, <code>ping</code>, tools, and resources.</dd></div>
        </dl>
      </Section>
      <Section id="authentication" title="Authentication">
        <p>Every request carries <code>Authorization: Bearer cos_...</code>. A key selects one company and resolves to a capability set before tool arguments are read.</p>
        <p>Every live key holds <code>context:read</code>. Extra capabilities are explicit grants. Tools remain visible even when a key lacks a grant, so the refusal can explain what authority is missing and who can grant it.</p>
      </Section>
      <Section id="resources" title="Resources">
        <p>The server implements <code>resources/list</code>, <code>resources/templates/list</code>, and <code>resources/read</code>. Resource URIs use the <code>companyos://</code> scheme.</p>
        <CodeBlock label="URI examples" code={`companyos://{company}/company
companyos://{company}/schema
companyos://{company}/documents
companyos://{company}/document/{slug}
companyos://{company}/branch/{branch}/document/{slug}
companyos://{company}/merge/{merge_id}
companyos://{company}/timeline`} />
        <p>Call <code>resources/list</code> for the map of the authenticated company and <code>resources/templates/list</code> for the URI grammar.</p>
      </Section>
      <Section id="writes" title="Safe writes">
        <ul>
          <li><code>document_put</code> is append-only and expects <code>base_revision</code>, not <code>expectedRevision</code>.</li>
          <li>Every commit needs a message that explains why the context changed.</li>
          <li>A branch reads as an overlay over main.</li>
          <li>Merge conflicts must be resolved explicitly with <code>take-branch</code> or <code>keep-main</code>.</li>
          <li>Reverts create forward revisions and never rewrite history.</li>
        </ul>
      </Section>
      <Section id="failures" title="Failures">
        <p>
          Application refusals are returned as JSON-RPC or MCP tool errors with actionable text. Rate limiting uses code <code>-32029</code>, includes <code>Retry-After</code>, and reports the reset time. Unknown or stale input is refused instead of repaired silently.
        </p>
      </Section>
    </>
  );
}

function McpToolsPage() {
  return (
    <>
      <PageIntro title="Tool reference" description="The current server exposes exactly 18 tools. The capability table is the authority surface." />
      <Section id="read" title="Read context">
        <ToolTable rows={readTools} />
      </Section>
      <Section id="write" title="Write and branch">
        <ToolTable rows={changeTools} />
      </Section>
      <Section id="protected" title="Protected changes">
        <ToolTable rows={protectedTools} />
        <Callout title="Main is protected" tone="dark">
          <p><code>branch:merge</code> is not implied by write access and is not granted to legacy keys. Most agents should draft on a branch and ask an authorized person or agent to land it.</p>
        </Callout>
      </Section>
      <Section id="workflow" title="Recommended workflow">
        <CodeBlock label="Tool sequence" code={`schema_describe
config_pull
document_get
branch_create
document_put
branch_diff
branch_merge`} />
        <p>Skip <code>branch_merge</code> when the key does not hold the capability. The branch remains reviewable in the app.</p>
      </Section>
    </>
  );
}

function SecurityPage() {
  return (
    <>
      <PageIntro title="Security and authority" description="Company OS treats credentials, capabilities, history, and production authority as separate controls." />
      <Section id="credential-model" title="Credential model">
        <ul>
          <li>agent tokens use the <code>cos_</code> prefix and are revealed once</li>
          <li>only a SHA-256 token hash is stored</li>
          <li>one token selects one company</li>
          <li>keys can expire, be revoked, and be limited to department lanes</li>
          <li>each MCP invocation is auditable, including refusals</li>
        </ul>
      </Section>
      <Section id="capability-model" title="Capability model">
        <p>
          Access is checked before arguments. Read, ordinary write, branch creation, feedback, run telemetry, document reverts, and main-changing merges are separate capabilities. This prevents a general write credential from silently acquiring authority to redefine main.
        </p>
      </Section>
      <Section id="history" title="History integrity">
        <p>
          Document and merge reverts always commit forward. A content hash identifies exact bytes. Branch diff exposes conflicts before merge. This gives operators a usable audit trail without pretending that revision history is the same as external provider proof.
        </p>
      </Section>
      <Section id="controller-boundary" title="Controller boundary">
        <p>
          The open source controller is fail closed. Agents may observe, analyze, propose, and perform pre-authorized low-risk work. Customer-facing, financial, legal, privileged, irreversible, or production-impacting actions require the authority named by the project contract.
        </p>
        <Callout title="No self-acceptance" tone="warning">
          <p>A worker can produce evidence. It cannot accept its own outcome unless the governing contract explicitly names that authority, which the standard Company OS flow does not.</p>
        </Callout>
      </Section>
    </>
  );
}

function TroubleshootingPage() {
  return (
    <>
      <PageIntro title="Troubleshooting" description="Start with the visible symptom, then check the narrowest authority or configuration boundary that can explain it." />
      <Section id="mcp-auth" title="MCP authentication">
        <h3>The client reports unauthorized</h3>
        <ul>
          <li>confirm the URL is exactly <code>{mcpEndpoint}</code></li>
          <li>confirm the header starts with <code>Bearer cos_</code></li>
          <li>confirm the environment variable is available to the client process</li>
          <li>check the Agents page for expiry or revocation</li>
          <li>issue a new key if the token may have been exposed</li>
        </ul>
        <h3>The client sees no tools</h3>
        <p>Inspect the client’s MCP logs, confirm <code>initialize</code> succeeds, and call <code>tools/list</code> directly. A healthy current server returns 18 tools.</p>
      </Section>
      <Section id="mcp-write" title="MCP write refusals">
        <h3>Stale base revision</h3>
        <p>Read the document again, reconcile the newer content, and retry with the new <code>base_revision</code>. Never increment the number without reading.</p>
        <h3>Missing capability</h3>
        <p>The refusal names the required capability. Commit to a branch if possible, then ask an owner or admin to grant or perform the protected action.</p>
        <h3>Branch conflict</h3>
        <p>Call <code>branch_diff</code>. Pass one resolution for each conflicting slug, using <code>take-branch</code> or <code>keep-main</code>.</p>
      </Section>
      <Section id="framework-install" title="Framework install">
        <h3>Manifest is stale</h3>
        <p>Do not install. Confirm you are on the intended release or commit. A dirty or mixed source tree should not be normalized into a release.</p>
        <h3>Existing target is different</h3>
        <p>Use <code>check-install</code>. A controlled upgrade must provide the exact accepted prior manifest and version. The installer intentionally refuses a blind overwrite.</p>
        <h3>Interrupted install</h3>
        <p>Run <code>recover-install</code> before another check or install. The recovery command is explicit so the installer never destroys ambiguous evidence.</p>
      </Section>
      <Section id="provider-features" title="Provider-backed features">
        <p>
          Core ledger and MCP behavior do not depend on the app’s optional model-backed features. Those features remain unavailable until a production <code>OPENROUTER_API_KEY</code> is configured and a live inference smoke test passes. A configured model name by itself is not proof of a working provider call.
        </p>
      </Section>
    </>
  );
}

function VersioningPage() {
  return (
    <>
      <PageIntro title="Versioning and upgrades" description="Version the framework, MCP contract, and web deployment separately. Verify the exact artifact you intend to run." />
      <Section id="versions" title="Know the versions">
        <dl className="definition-list">
          <div><dt>Framework</dt><dd><code>0.6.0</code> in the current canonical repository.</dd></div>
          <div><dt>MCP server</dt><dd><code>company-os-ledger 1.6.0</code>.</dd></div>
          <div><dt>MCP revision</dt><dd><code>2025-06-18</code>.</dd></div>
          <div><dt>Ledger contract</dt><dd><code>context-ledger.v1</code>.</dd></div>
        </dl>
      </Section>
      <Section id="framework-upgrade" title="Framework upgrade">
        <p>Keep the accepted prior manifest and version. The installer stages the incoming Company OS and Autonomy Suite bundles, verifies them, then replaces both as one transaction with rollback on failure.</p>
        <CodeBlock code={`python3 scripts/distribution.py install \\
  --target /absolute/path/to/skills \\
  --prior-manifest /absolute/path/to/prior/distribution-manifest.json \\
  --prior-version 0.5.1`} />
      </Section>
      <Section id="mcp-compatibility" title="MCP compatibility">
        <p>
          Ledger server 1.6.0 is additive relative to 1.5. Existing tool names and optional parameters remain compatible. New clients should still discover the live server with <code>initialize</code> and <code>tools/list</code> instead of hard-coding an assumed surface.
        </p>
      </Section>
      <Section id="release-checklist" title="Release checklist">
        <ol>
          <li>pin the exact source commit</li>
          <li>verify the distribution manifest and full test suite</li>
          <li>pack the npm artifact without publishing</li>
          <li>inspect the file allowlist and version parity</li>
          <li>install the tarball in a disposable consumer</li>
          <li>publish a prerelease with provenance</li>
          <li>promote the exact tested version</li>
        </ol>
      </Section>
    </>
  );
}

function RoadmapPage() {
  return (
    <>
      <PageIntro title="Delivery roadmap" description="Release Company OS in evidence-gated phases so the public story never moves ahead of the product’s verified reality." />
      <Section id="phase-one" title="1. Stabilize the product">
        <ul>
          <li>complete app security, auth, invitation, governance, mobile, and reliability fixes</li>
          <li>run local unit, type, lint, build, and browser checks</li>
          <li>deploy the exact tested app commit to Vercel</li>
          <li>make <code>www.companyos.sh</code> serve that exact production deployment</li>
        </ul>
      </Section>
      <Section id="phase-two" title="2. Document and prove the connection">
        <ul>
          <li>deploy this site to <code>docs.companyos.sh</code></li>
          <li>verify the production MCP endpoint rejects unauthenticated requests correctly</li>
          <li>run authenticated <code>initialize</code>, <code>tools/list</code>, resources, read, branch, write, and authority tests</li>
          <li>test each documented client against the live endpoint</li>
        </ul>
      </Section>
      <Section id="phase-three" title="3. Package the framework">
        <ul>
          <li>choose and commit the repository license and notices</li>
          <li>secure the <code>@mosnin</code> npm scope with 2FA</li>
          <li>build the no-shell Node wrapper around the Python distribution installer</li>
          <li>add strict package contents, version parity, and clean-install tests</li>
        </ul>
      </Section>
      <Section id="phase-four" title="4. Publish safely">
        <ul>
          <li>run <code>npm pack</code> and inspect the tarball</li>
          <li>install the tarball in a disposable environment</li>
          <li>publish the exact artifact to a prerelease tag with provenance</li>
          <li>verify registry install behavior, then promote the same version to stable</li>
        </ul>
      </Section>
      <Section id="phase-five" title="5. Expand from real usage">
        <ul>
          <li>add quickstarts for more tested MCP clients</li>
          <li>publish company templates and department playbooks</li>
          <li>add source freshness and provenance workflows to the ledger</li>
          <li>keep advanced framework runtime claims behind their acceptance gates</li>
        </ul>
      </Section>
    </>
  );
}

function LinksPage() {
  return (
    <>
      <PageIntro title="Project links" description="Use these canonical sources when a guide and the live product appear to disagree." />
      <Section id="company-os" title="Company OS">
        <div className="split-choices">
          <SplitChoice title="Web app" href={appUrl} action="Open Company OS" external><p>The hosted company context ledger.</p></SplitChoice>
          <SplitChoice title="Framework source" href={frameworkRepository} action="Open on GitHub" external><p>The canonical controller, skills, contracts, distribution tooling, and tests.</p></SplitChoice>
          <SplitChoice title="Web source, private" href={webRepository} action="Open on GitHub" external><p>The Next.js and Convex application for authorized GitHub collaborators.</p></SplitChoice>
        </div>
      </Section>
      <Section id="client-docs" title="Client docs">
        <ul className="link-list">
          <li><InlineLink href="https://code.claude.com/docs/en/mcp">Claude Code MCP documentation</InlineLink></li>
          <li><InlineLink href="https://cursor.com/docs/context/mcp">Cursor MCP documentation</InlineLink></li>
          <li><InlineLink href="https://developers.openai.com/codex/mcp/">Codex MCP documentation</InlineLink></li>
          <li><InlineLink href="https://modelcontextprotocol.io/specification/2025-06-18">MCP 2025-06-18 specification</InlineLink></li>
        </ul>
      </Section>
      <Section id="support-status" title="Support status">
        <p>
          The framework’s Git installation and the app’s MCP wire contract are current source-backed paths. The npm command is release gated. OpenRouter-backed app features are not claimed live until a production key and inference test exist. Client compatibility is documented only where the client’s current configuration format is known and can be tested.
        </p>
      </Section>
    </>
  );
}

export function DocsContent({ doc }: { doc: DocPage }) {
  switch (doc.slug) {
    case "": return <OverviewPage />;
    case "start/mental-model": return <MentalModelPage />;
    case "app/quickstart": return <AppQuickstartPage />;
    case "app/context-ledger": return <ContextLedgerPage />;
    case "app/api-keys": return <AgentKeysPage />;
    case "framework/install": return <FrameworkInstallPage />;
    case "framework/architecture": return <FrameworkArchitecturePage />;
    case "framework/operators": return <FrameworkOperatorsPage />;
    case "mcp/connect": return <McpConnectPage />;
    case "mcp/clients": return <McpClientsPage />;
    case "mcp/contract": return <McpContractPage />;
    case "mcp/tools": return <McpToolsPage />;
    case "operate/security": return <SecurityPage />;
    case "operate/troubleshooting": return <TroubleshootingPage />;
    case "operate/versioning": return <VersioningPage />;
    case "reference/roadmap": return <RoadmapPage />;
    case "reference/links": return <LinksPage />;
    default: return null;
  }
}
