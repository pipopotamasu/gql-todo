const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const server = new ApolloServer({ typeDefs, resolvers });

// Create an express server and a GraphQL endpoint
const app = express();
server.applyMiddleware({ app });

app.listen(4000, () => console.log('Express GraphQL Server Now Running On http://localhost:4000/graphql'));