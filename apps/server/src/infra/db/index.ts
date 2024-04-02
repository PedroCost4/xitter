import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

export const startDb = async () => {
	const client = postgres(process.env.DATABASE_URL, { max: 1 });
	const db = drizzle(client);

	migrate(db, { migrationsFolder: "migrations" });

	return db;
};
