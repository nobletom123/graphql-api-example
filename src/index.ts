import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import httpHeadersPlugin from "apollo-server-plugin-http-headers";
import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import { DocumentNode } from "graphql";
import cors from "cors";

import { typeDefs } from "./type-definitions";
import resolvers from "./resolvers";
import { AuthUtils } from "./utils/auth-utils";

async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: Record<string, any>
) {
  const app = express();

  app.use(cookieParser());

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      httpHeadersPlugin,
    ],
    context: AuthUtils.getAuthContext,
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: process.env.FRONT_END_URL,
      credentials: true,
    },
  });
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
