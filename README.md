# gql-todo
GraphQL todo app with apollo client and apollo server.

## Get started
```
$ git clone https://github.com/pipopotamasu/gql-todo.git
$ cd gql-todo/server
$ yarn && yarn start

open other tab in your terminal

$ cd path/to/gql-todo/front
$ yarn && yarn start
```

After this commands, you can visit http://localhost:3000.

## Frontend
React application with apollo-client.
- create-react-app
- typescript
- apollo-client

## Backend
Express application with apollo-server.

- express
- apollo-server

Data is not permanented because this application does not use database.
<br>
You can use GraphQL Playground in http://localhost:4000/graphql

## Update Schema Types
`/front` dir type definitions depend on GraphQL schema which is located in `/server`.
When you update GraphQL schema in `/server`, you should update type definitions for `/front`.

This is how to update.
```
$ cd path/to/gql-todo/front
$ yarn apollo:download
$ yarn apollo:codegen // Type definitions will be generated or updated!
```
