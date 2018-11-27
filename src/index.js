import { ApolloServer } from 'apollo-server-express';
import { formatError } from 'apollo-errors';
import jwt from 'jsonwebtoken';
import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import resolvers from './resolvers';
import context from './utils/makeContext';
import typeDefs from './typeDefs';

require('dotenv').config();


// next up:
// covert getUserIdFromToken to a more complex function that returns a full user object
// get integration tests working
// get auth to benchmark
const expressServer = express();
expressServer.use(cookieParser());

const port = process.env.PORT || 8080;

// decode the JWT so we can get the user Id on each request
expressServer.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      req.userId = decoded.sub || null;
    } catch (e) {
      req.userId = null;
    }
  }
  next();
});

// Set up Apollo Server
const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  formatError,
  // engine: {
  //   apiKey: process.env.ENGINE_API_KEY,
  //   ...internalEngineDemo,
  // },
});

gqlServer.applyMiddleware({
  app: expressServer,
  path: '/graphql',
});

const httpServer = createServer(expressServer);
gqlServer.installSubscriptionHandlers(httpServer);

if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`🚀 Server Listening on http://localhost:${port}`);
    // eslint-disable-next-line no-console
    console.log(
      `🚀 GRAPHQL ready at http://localhost:${port}${gqlServer.graphqlPath}`,
    );
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${port}${
        gqlServer.subscriptionsPath
      }`,
    );
  });
  // server
  //   .listen({ port: process.env.PORT })
  //   // eslint-disable-next-line no-console
  //   .then(({ url }) => console.log(`🚀 app running at ${url}`));
}

export default gqlServer;
