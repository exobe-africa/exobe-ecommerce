import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      email
      name
      phone
      role
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      email
      name
      phone
      role
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      phone
      role
    }
  }
`;


