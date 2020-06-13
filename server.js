const fs = require('fs');
const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const root = require('./resolvers')

// GraphQL schema
const schema = buildSchema(fs.readFileSync('./schema.gql', 'utf8'));

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
 schema: schema,
 rootValue: root,
 graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On http://localhost:4000/graphql'));