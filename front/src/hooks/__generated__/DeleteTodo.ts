/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTodo
// ====================================================

export interface DeleteTodo_deleteTodo_user {
  id: number;
}

export interface DeleteTodo_deleteTodo {
  id: number;
  user: DeleteTodo_deleteTodo_user;
  content: string;
  done: boolean;
}

export interface DeleteTodo {
  deleteTodo: DeleteTodo_deleteTodo;
}

export interface DeleteTodoVariables {
  id: number;
}
