/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchTodos
// ====================================================

export interface FetchTodos_todos_user {
  id: number;
}

export interface FetchTodos_todos {
  id: number;
  user: FetchTodos_todos_user;
  content: string;
  done: boolean;
}

export interface FetchTodos {
  todos: FetchTodos_todos[];
}
