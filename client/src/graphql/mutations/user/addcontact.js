import { gql } from '@apollo/client'

export const ADD_CONTACT_MUTATION = gql`
mutation addContact($requestId: ID, $requestMessage: String) {
  result: AddContact(requestId: $requestId, requestMessage: $requestMessage) {
    success
    message
  }
}`;