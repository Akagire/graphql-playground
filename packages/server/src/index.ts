import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';

// @ts-ignore
// typeDefs の型をどう持ってくるかぱっとわからず。チュートリアルのまま進める
async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app, path: '/' });

  await new Promise<void>(resolve => httpServer.listen({ port: 3001 }, resolve));
  console.log(`Server ready at http://localhost:3001${server.graphqlPath}`);
}

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  }
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

startApolloServer(typeDefs, resolvers);
