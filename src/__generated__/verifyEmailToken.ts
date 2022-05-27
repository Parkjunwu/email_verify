/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyEmailToken
// ====================================================

export interface verifyEmailToken_verifyEmailToken {
  __typename: "LoginResult";
  ok: boolean;
  error: string | null;
}

export interface verifyEmailToken {
  verifyEmailToken: verifyEmailToken_verifyEmailToken;
}

export interface verifyEmailTokenVariables {
  token: string;
}