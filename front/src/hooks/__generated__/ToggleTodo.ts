/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleTodo
// ====================================================

export interface ToggleTodo_toggleTodo_user {
  id: number;
}

export interface ToggleTodo_toggleTodo {
  id: number;
  user: ToggleTodo_toggleTodo_user;
  content: string;
  done: boolean;
}

export interface ToggleTodo {
  toggleTodo: ToggleTodo_toggleTodo;
}

export interface ToggleTodoVariables {
  id: number;
}
