---
'@smoasters/zoho-suite': minor
---

Add CJS support and migrate to Bun

- Add CommonJS build output alongside existing ESM
- Migrate build system from pnpm to Bun
- Update CI/CD pipeline to use Bun
- Remove dotenv, vitest dependency (Bun handles .env, tests natively)
