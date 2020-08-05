import { gql } from '@apollo/client'

export const ADD_CONTACT_MUTATION = gql`
mutation AddUserRequest($requestId: ID) {
  result: AddUserRequest(requestId: $requestId) {
    success
    message
  }
}`;