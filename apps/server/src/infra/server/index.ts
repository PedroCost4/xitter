import { readFileSync } from "node:fs";
import http from "node:http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";
import cors from "@koa/cors";
import Koa from "koa";
import bodyparser from "koa-bodyparser";
import { startDb } from "../db";

const app = new Koa();
const httpServer = http.createServer(app.callback());

const server = new ApolloServer({
	typeDefs: readFileSync("./schema.gql", { encoding: "utf-8" }),
	resolvers: [],
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
const db = startDb()

app.use(cors());
app.use(bodyparser());
app.use(
	koaMiddleware(server, {
		context: async ({ ctx }) => ({ db }),
	}),
);

await new Promise<void>((resolve) =>
	httpServer.listen({ port: process.env.PORT }, resolve),
);

console.log(`Server running at http://localhost:${process.env.PORT}`);
