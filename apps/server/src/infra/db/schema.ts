import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid("uuid").primaryKey(),
	email: text("text").unique().notNull(),
	password: text("text").notNull(),
	created_at: text("timestamp").default("now()"),
	updated_at: text("timestamp").default("now()"),
});
