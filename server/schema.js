const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    todo(id: Int!): Todo
    todos(searchBy: String = "", filter: TodoFilter = ALL, limit: Int = 10): [Todo!]!
    todoTotalCount: Int!
    hello: String
  }

  type Mutation {
    toggleTodo(id: Int!): Todo
    addTodo(input: TodoCreateInput!): Todo
    updateTodoContent(input: TodoUpdateInput!): Todo
    deleteTodo(id: Int!): Todo
  }

  input TodoCreateInput {
    content: String!
    userId: Int!
  }

  input TodoUpdateInput {
    id: Int!
    content: String!
  }

  enum TodoFilter {
    ALL
    DONE
    TODO
  }

  type Todo {
    id: Int
    user: User!
    content: String
    done: Boolean
  }

  type User {
    id: Int
    name: String
  }
`;