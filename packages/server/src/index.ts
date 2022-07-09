import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

const app = express();

server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen(3001, () => {
  console.log(`Express server ready at http://localhost:3001${server.graphqlPath}`);
});
