import { gql } from '@apollo/client';

// User Queries
export const GET_AUTH_USER = gql`
  query GetAuthUser {
    authUser {
      _id
      username
      name
      profilePic
      gender
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      name
      profilePic
      gender
      transactions {
        _id
        description
        paymentType
        category
        amount
        location
        date
      }
    }
  }
`;

// User Mutations
export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      username
      name
      profilePic
      gender
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      _id
      username
      name
      profilePic
      gender
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
