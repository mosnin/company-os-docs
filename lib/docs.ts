export type DocSection = {
  id: string;
  label: string;
};

export type DocPage = {
  slug: string;
  title: string;
  navLabel: string;
  summary: string;
  description: string;
  keywords: string[];
  sections: DocSection[];
};

export type NavGroup = {
  label: string;
  items: DocPage[];
};

const start: DocPage[] = [
  {
    slug: "",
    title: "Company OS documentation",
    navLabel: "Overview",
    summary: "Understand the web context ledger, the open source framework, and how they fit together.",
    description: "Start with the Company OS mental model, choose the web app or framework path, and connect the two through MCP.",
    keywords: ["overview", "mental model", "web app", "framework", "context ledger"],
    sections: [
      { id: "two-parts", label: "Two parts, one system" },
      { id: "choose-a-path", label: "Choose a path" },
      { id: "truth-boundaries", label: "Truth boundaries" },
    ],
  },
  {
    slug: "start/mental-model",
    title: "Mental model",
    navLabel: "Mental model",
    summary: "Know which part of Company OS owns context, execution, and authority.",
    description: "A plain-language model for the Company OS web app, open source framework, and MCP bridge.",
    keywords: ["mental model", "ledger", "controller", "MCP", "authority"],
    sections: [
      { id: "context", label: "Context lives in the app" },
      { id: "execution", label: "Execution lives in the framework" },
      { id: "connection", label: "MCP connects them" },
      { id: "example-loop", label: "A practical loop" },
    ],
  },
];

const app: DocPage[] = [
  {
    slug: "app/quickstart",
    title: "Web app quickstart",
    navLabel: "Quickstart",
    summary: "Create a company, add context, and prepare an agent connection.",
    description: "Set up the Company OS web context ledger and reach a useful first state.",
    keywords: ["app", "quickstart", "company", "department", "document"],
    sections: [
      { id: "create-company", label: "Create a company" },
      { id: "add-context", label: "Add context" },
      { id: "invite-team", label: "Invite your team" },
      { id: "connect-agent", label: "Connect an agent" },
    ],
  },
  {
    slug: "app/context-ledger",
    title: "The context ledger",
    navLabel: "Context ledger",
    summary: "Store company context as typed, versioned documents grouped by department.",
    description: "Learn how documents, revisions, branches, hashes, and department views work in the web app.",
    keywords: ["ledger", "documents", "revision", "branch", "hash", "department"],
    sections: [
      { id: "documents", label: "Documents and departments" },
      { id: "revisions", label: "Revisions and hashes" },
      { id: "branches", label: "Branches and main" },
      { id: "history", label: "History and reverts" },
    ],
  },
  {
    slug: "app/api-keys",
    title: "Create an agent key",
    navLabel: "Agent keys",
    summary: "Issue a scoped credential from the Agents page and keep the token private.",
    description: "Create, copy, scope, audit, and revoke Company OS MCP credentials.",
    keywords: ["api key", "agent key", "Agents page", "token", "capability", "cos"],
    sections: [
      { id: "issue", label: "Issue the key" },
      { id: "capabilities", label: "Choose capabilities" },
      { id: "store", label: "Store it safely" },
      { id: "audit", label: "Audit and revoke" },
    ],
  },
];

const framework: DocPage[] = [
  {
    slug: "framework/install",
    title: "Install the framework",
    navLabel: "Install",
    summary: "Install the current framework from Git, verify its manifest, and understand the npm release gate.",
    description: "Authoritative Git installation steps for Company OS 0.6.0, plus the planned npm path.",
    keywords: ["install", "git", "npm", "python", "manifest", "0.6.0"],
    sections: [
      { id: "requirements", label: "Requirements" },
      { id: "git-install", label: "Install from Git" },
      { id: "verify", label: "Verify the source" },
      { id: "npm-status", label: "npm release status" },
    ],
  },
  {
    slug: "framework/architecture",
    title: "Framework architecture",
    navLabel: "Architecture",
    summary: "Understand the canonical core, installed distribution, project instance, and authority boundary.",
    description: "A compact architecture guide to the open source Company OS control plane.",
    keywords: ["architecture", "controller", "SQLite", "project isolation", "authority", "skills"],
    sections: [
      { id: "layers", label: "Four authority layers" },
      { id: "project-isolation", label: "Project isolation" },
      { id: "control-store", label: "Control store" },
      { id: "current-reality", label: "Current reality" },
    ],
  },
  {
    slug: "framework/operators",
    title: "Operator commands",
    navLabel: "Operator commands",
    summary: "Initialize a project, inspect readiness, render a brief, and recover an install safely.",
    description: "A practical reference for the framework commands operators use most often.",
    keywords: ["commands", "controller", "init", "audit", "brief", "recover"],
    sections: [
      { id: "controller", label: "Controller path" },
      { id: "initialize", label: "Initialize a project" },
      { id: "inspect", label: "Audit and brief" },
      { id: "distribution", label: "Distribution commands" },
      { id: "advanced", label: "Advanced mutations" },
    ],
  },
];

const mcp: DocPage[] = [
  {
    slug: "mcp/connect",
    title: "Connect through MCP",
    navLabel: "Connect",
    summary: "Connect an MCP client to the hosted Company OS context ledger.",
    description: "Use the Company OS Streamable HTTP endpoint and a scoped bearer token.",
    keywords: ["MCP", "connect", "endpoint", "bearer", "streamable HTTP", "JSON-RPC"],
    sections: [
      { id: "before-you-start", label: "Before you start" },
      { id: "endpoint", label: "Endpoint" },
      { id: "handshake", label: "Test the handshake" },
      { id: "first-calls", label: "Make the first calls" },
    ],
  },
  {
    slug: "mcp/clients",
    title: "Client setup",
    navLabel: "Client setup",
    summary: "Configure Claude Code, Cursor, and Codex with the Company OS MCP endpoint.",
    description: "Known Streamable HTTP configuration examples for common agent clients.",
    keywords: ["Claude", "Cursor", "Codex", "config", "mcp.json", "config.toml"],
    sections: [
      { id: "claude-code", label: "Claude Code" },
      { id: "cursor", label: "Cursor" },
      { id: "codex", label: "Codex" },
      { id: "verify-client", label: "Verify the client" },
    ],
  },
  {
    slug: "mcp/contract",
    title: "MCP contract",
    navLabel: "Protocol contract",
    summary: "Read the exact transport, protocol, authentication, resource, and error contract.",
    description: "Current Company OS MCP server contract for context-ledger.v1 and MCP 2025-06-18.",
    keywords: ["contract", "protocol", "2025-06-18", "resources", "errors", "stateless"],
    sections: [
      { id: "wire", label: "Wire contract" },
      { id: "authentication", label: "Authentication" },
      { id: "resources", label: "Resources" },
      { id: "writes", label: "Safe writes" },
      { id: "failures", label: "Failures" },
    ],
  },
  {
    slug: "mcp/tools",
    title: "Tool reference",
    navLabel: "18 tools",
    summary: "See all 18 current Company OS MCP tools grouped by capability.",
    description: "The complete Company OS ledger tool surface and the capability required by each tool.",
    keywords: ["tools", "config_pull", "document_put", "branch_merge", "schema_describe"],
    sections: [
      { id: "read", label: "Read context" },
      { id: "write", label: "Write and branch" },
      { id: "protected", label: "Protected changes" },
      { id: "workflow", label: "Recommended workflow" },
    ],
  },
];

const operate: DocPage[] = [
  {
    slug: "operate/security",
    title: "Security and authority",
    navLabel: "Security",
    summary: "Protect credentials, separate capabilities, and keep production authority explicit.",
    description: "Security rules for the web ledger, MCP keys, and open source controller.",
    keywords: ["security", "authority", "capabilities", "credentials", "audit", "tenant"],
    sections: [
      { id: "credential-model", label: "Credential model" },
      { id: "capability-model", label: "Capability model" },
      { id: "history", label: "History integrity" },
      { id: "controller-boundary", label: "Controller boundary" },
    ],
  },
  {
    slug: "operate/troubleshooting",
    title: "Troubleshooting",
    navLabel: "Troubleshooting",
    summary: "Resolve the most common app, MCP, install, and provider setup failures.",
    description: "A symptom-first troubleshooting guide for Company OS.",
    keywords: ["troubleshooting", "401", "refused", "revision", "manifest", "OpenRouter"],
    sections: [
      { id: "mcp-auth", label: "MCP authentication" },
      { id: "mcp-write", label: "MCP write refusals" },
      { id: "framework-install", label: "Framework install" },
      { id: "provider-features", label: "Provider-backed features" },
    ],
  },
  {
    slug: "operate/versioning",
    title: "Versioning and upgrades",
    navLabel: "Versioning",
    summary: "Pin releases, verify manifests, and upgrade without silently replacing evidence.",
    description: "Safe version and upgrade practices for both Company OS surfaces.",
    keywords: ["version", "upgrade", "manifest", "prior version", "release", "npm"],
    sections: [
      { id: "versions", label: "Know the versions" },
      { id: "framework-upgrade", label: "Framework upgrade" },
      { id: "mcp-compatibility", label: "MCP compatibility" },
      { id: "release-checklist", label: "Release checklist" },
    ],
  },
];

const reference: DocPage[] = [
  {
    slug: "reference/roadmap",
    title: "Delivery roadmap",
    navLabel: "Delivery roadmap",
    summary: "See the release sequence for the app, docs, MCP proof, and npm package.",
    description: "A phased, evidence-gated roadmap for the Company OS public release.",
    keywords: ["roadmap", "phase", "release", "npm", "docs", "deploy"],
    sections: [
      { id: "phase-one", label: "1. Stabilize" },
      { id: "phase-two", label: "2. Document and prove" },
      { id: "phase-three", label: "3. Package" },
      { id: "phase-four", label: "4. Publish" },
      { id: "phase-five", label: "5. Expand" },
    ],
  },
  {
    slug: "reference/links",
    title: "Project links",
    navLabel: "Project links",
    summary: "Find the hosted app, source repositories, and client documentation used in these guides.",
    description: "Canonical Company OS links and external client references.",
    keywords: ["links", "GitHub", "app", "Claude", "Cursor", "Codex"],
    sections: [
      { id: "company-os", label: "Company OS" },
      { id: "client-docs", label: "Client docs" },
      { id: "support-status", label: "Support status" },
    ],
  },
];

export const navigation: NavGroup[] = [
  { label: "Start", items: start },
  { label: "Web app", items: app },
  { label: "Framework", items: framework },
  { label: "MCP", items: mcp },
  { label: "Operate", items: operate },
  { label: "Reference", items: reference },
];

export const docs = navigation.flatMap((group) => group.items);

export function docHref(slug: string): string {
  return slug ? `/${slug}/` : "/";
}

export function getDoc(slug: string): DocPage | undefined {
  return docs.find((doc) => doc.slug === slug);
}

export function getAdjacentDocs(slug: string): {
  previous?: DocPage;
  next?: DocPage;
} {
  const index = docs.findIndex((doc) => doc.slug === slug);
  return {
    previous: index > 0 ? docs[index - 1] : undefined,
    next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : undefined,
  };
}
