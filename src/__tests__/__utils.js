import { ApolloServer } from 'apollo-server';
import makeContext from '../utils/makeContext';
import resolvers from '../resolvers';
import typeDefs from '../typeDefs';

// const { HttpLink } = require('apollo-link-http');
// const fetch = require('node-fetch');
// const { execute, toPromise } = require('apollo-link');


// module.exports.toPromise = toPromise;

// const {
//   dataSources,
//   context: defaultContext,
//   typeDefs,
//   resolvers,
//   ApolloServer,
//   LaunchAPI,
//   UserAPI,
//   store,
// } = require('../');

export const makeTestContext = async (preOverRides, postOverRides) => {
  const preOverRideWithRequest = Object.assign({}, { req: {} }, preOverRides);
  const defaultContext = await makeContext(preOverRideWithRequest);
  return Object.assign({}, defaultContext, postOverRides);
};

/**
 * Integration testing utils
 */
export const constructTestServer = ({ context = makeContext() } = {}) => {
//   const userAPI = new UserAPI({ store });
//   const launchAPI = new LaunchAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  return { server };
};

// module.exports.constructTestServer = constructTestServer;

/**
 * e2e Testing Utils
 */

// const startTestServer = async (server) => {
//   // if using apollo-server-express...
//   // const app = express();
//   // server.applyMiddleware({ app });
//   // const httpServer = await app.listen(0);

//   const httpServer = await server.listen({ port: 0 });

//   const link = new HttpLink({
//     uri: `http://localhost:${httpServer.port}`,
//     fetch,
//   });

//   const executeOperation = ({ query, variables = {} }) => execute(link, { query, variables });

//   return {
//     link,
//     stop: () => httpServer.server.close(),
//     graphql: executeOperation,
//   };
// };

// module.exports.startTestServer = startTestServer;
