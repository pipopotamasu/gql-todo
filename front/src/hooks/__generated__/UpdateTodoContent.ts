/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTodoContent
// ====================================================

export interface UpdateTodoContent_updateTodoContent_user {
  id: number;
}

export interface UpdateTodoContent_updateTodoContent {
  id: number;
  user: UpdateTodoContent_updateTodoContent_user;
  content: string;
  done: boolean;
}

export interface UpdateTodoContent {
  updateTodoContent: UpdateTodoContent_updateTodoContent;
}

export interface UpdateTodoContentVariables {
  id: number;
  content: string;
}
