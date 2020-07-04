/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddTodo
// ====================================================

export interface AddTodo_addTodo_user {
  id: number;
}

export interface AddTodo_addTodo {
  id: number;
  user: AddTodo_addTodo_user;
  content: string;
  done: boolean;
}

export interface AddTodo {
  addTodo: AddTodo_addTodo;
}

export interface AddTodoVariables {
  content: string;
  userId: number;
}
