# Company OS documentation

Static-first Next.js 16 documentation for the Company OS web context ledger, open source framework, and hosted MCP connection.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run test
npm run lint
npm run typecheck
npm run build
```

The production build is a static export in `out/`.

## Deployment target

- Production hostname: `docs.companyos.sh`
- Framework source: `https://github.com/mosnin/companyos`
- Web source: `https://github.com/mosnin/company-os-web`
- Hosted app: `https://www.companyos.sh`

This local repository has no remote and is not linked to a Vercel project yet. Before release, create a dedicated GitHub repository, import it into Vercel, add `docs.companyos.sh`, and verify the domain serves the exact tested commit.

## Release truth

- The Git framework install is the supported source-backed path.
- The `@mosnin/companyos` npm command is marked release gated because the package is not published.
- The MCP contract is documented from the current web ledger source.
- Provider-backed app features are not presented as live without a production key and smoke test.

## Kernel compatibility maintenance

The optional Dev OS package joins Business OS and Design OS under the existing
Company OS protocol v1. Keep `docs/kernels.md`, the rendered Private kernels page
and the canonical schema aligned. Package readiness is separate from publication.
