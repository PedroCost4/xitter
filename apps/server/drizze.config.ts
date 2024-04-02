import type { Config } from 'drizzle-kit'

export default {
  schema: "./src/infra/db/schema.ts",
  out: "./drizzle",
} satisfies Config