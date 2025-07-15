import { gql } from '@apollo/client';

// Transaction Queries
export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
      user {
        _id
        username
        name
        profilePic
      }
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
      user {
        _id
        username
        name
        profilePic
      }
    }
  }
`;

export const GET_CATEGORY_STATISTICS = gql`
  query GetCategoryStatistics {
    categoryStatistics {
      category
      totalAmount
    }
  }
`;

// Transaction Mutations
export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: createTransactionInput!) {
    createTransaction(input: $input) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
      user {
        _id
        username
        name
      }
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: updateTransactionInput!) {
    updateTransaction(input: $input) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
      user {
        _id
        username
        name
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      _id
    }
  }
`;
