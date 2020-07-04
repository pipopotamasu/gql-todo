/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: todoFields
// ====================================================

export interface todoFields_user {
  id: number;
}

export interface todoFields {
  id: number;
  user: todoFields_user;
  content: string;
  done: boolean;
}
